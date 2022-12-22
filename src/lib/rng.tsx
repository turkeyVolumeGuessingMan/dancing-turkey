import { ReactElement, useContext, useEffect, useState } from "react"
import ReactDOMServer from "react-dom/server"
import lerkey from "./lerkey"
import stringToHash from "./stringToHash"
import { getTurn, reheatGravy, stowGravy } from "./gravy"

/**
 * Get a random ordered version of an array.
 * @param {Array} array Array to shuffle.
 * @returns {Array} Returns the same array in random order.
 */
export const shuffle = (array: any): Array<any> => {

  // fisher-yates shuffle

  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

/**
 * Roll a number between 0 and 100.
 * @param {number} odds Likelihood of a true result. The higher the number, the more likely roll will return true.
 * @returns {boolean} Likelihood as a boolean.
 */
export const roll = (odds: number): boolean => {
  return (odds >= Math.floor(Math.random() * 100))
}


export const StopList = (props: { list: ReactElement[] }) => {
  const gravy = reheatGravy();
  const hashLst = props.list.map(e => ReactDOMServer.renderToString(e)).join('-');
  const id = `cd{${stringToHash(hashLst)}}`;
  if (!gravy[id]) {
    gravy[id] = getTurn();
    stowGravy(gravy);
  }
  const index = getTurn() - gravy[id];
  return (index < props.list.length) ? props.list[index] : props.list[props.list.length - 1];
}


export const ShuffleList = (props: { list: ReactElement[] }) =>
  shuffle([...props.list])[0];

