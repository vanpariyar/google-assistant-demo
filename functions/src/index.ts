import * as functions from 'firebase-functions';

// Web scrapping Deps
import fetch from 'node-fetch';
import * as cheerio from "cheerio";

//Google Assistant Deps
import { dialogflow, SimpleResponse, BasicCard, Button, Image } from 'actions-on-google';
const app = dialogflow({ debug: true });

//Insert Dialogfolw Stuff Here....
//Export the Cloud Functions

export const fulfillment = functions.https.onRequest(app);