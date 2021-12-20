import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationsList from './src/components/QuotationsList';

function addZero(number) {
  if(number <=9) {
    return "0" + number
  }
  return number
}

function url(qtdDays) {
  const date = new Date();
  const listLastDays = qtdDays;
  const end_date = `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`;
  date.setDate(date.getDate() - listLastDays);
  const start_date = `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`;
  
  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start_date}&end=${end_date}&currency=usd`
}

async function getCoinsList(url) {
  let response = await fetch(url);
  let retunrApi = await response.json();
  let selectListQuotations = retunrApi.bpi;
  const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
    return {
      data: key.split("-").reverse().join("/"),
      valor: selectListQuotations[key],
    };
  });
  let data = queryCoinsList.reverse();
  return data;
}

async function getPriceCoinsGraphic(url) {
  let responseG = await fetch(url);
  let returnApiG = await responseG.json();
  let selectListQuotationsG = returnApiG.bpi;
  const queryCoinsListG = Object.keys(selectListQuotationsG).map((key) => {
    return selectListQuotationsG[key];
  });
  let dataG = queryCoinsListG;
  return dataG;
}

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(30);
  const [updateDate, setUpdateDate] = useState(true);
  const [price, setPrice] = useState();

  function updateDay(number) {
    setDays(number);
    setUpdateDate(true);
  }

  function priceCotation() {
    setPrice(coinsGraphicList.pop());
  }

  useEffect(() => {
    getCoinsList(url(days)).then((data) => {
      setCoinsList(data);
    });
    getPriceCoinsGraphic(url(days)).then((dataG) => {
      setCoinsGraphicList(dataG);
    });
    priceCotation();
    if (updateDate) {
      setUpdateDate(false);
    }
  }, [updateDate]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor='#f50d41'
        barStyle='dark-content'
      />
      <CurrentPrice lastCotation={price}/>
      <HistoryGraphic infoDataGraphic={coinsGraphicList}/>
      <QuotationsList filterDay={updateDay} listTransactions={coinsList}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
});
