﻿import { jsPDF } from 'jspdf';

export const FONT_BLISSPRO_BOLD =

const callAddFont = function (this: jsPDF) {
  this.addFileToVFS('BlissPro-bold.ttf', FONT_BLISSPRO_BOLD);
  this.addFont('BlissPro-bold.ttf', 'BlissPro', 'bold');
};
jsPDF.API.events.push(['addFonts', callAddFont]);