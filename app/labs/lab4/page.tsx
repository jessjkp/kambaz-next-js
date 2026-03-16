"use client";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariables";
import ObjectStateVariable from "./ObjectStateVariables";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import UrlEncoding from "./query-parameters";
import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
        <Provider store={store}>

    <div id="wd-lab4" className="container">
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello}/>
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <UrlEncoding />
      <Link href="/labs/lab4/redux">Redux Examples</Link>  
           <hr />
  
      <Link href="./lab4/react-context">React Context Examples</Link>
           <hr />
     <Link href="./lab4/zustand">Zustand Examples</Link>
      </div>
          </Provider>

  );
}