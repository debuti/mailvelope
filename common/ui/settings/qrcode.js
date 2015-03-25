/**
 * Mailvelope - secure email with OpenPGP encryption for Webmail
 * Copyright (C) 2012  Thomas Oberndörfer
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License version 3
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

var mvelo = mvelo || null;
var options = options || null;

(function(options) {

  var qrcode;
  var elText;

  function init() {
    elText = document.getElementById("text4QR");
    qrcode = new QRCode("qrcode", {
        text: elText.value,
        width: 256,
        height: 256,
        colorDark : "#008000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.Q
        // Level L (Low)	7% of codewords can be restored.
        // Level M (Medium)	15% of codewords can be restored.
        // Level Q (Quartile)	25% of codewords can be restored.
        // Level H (High)	30% of codewords can be restored.
    });

    $("#generateQR").on("click", generateQR);

    $("#generatePDF").on("click", generatePDF);

    generateQR();
  }

  function generateQR() {
    qrcode.clear();
    qrcode.makeCode(elText.value);
  }

  function generatePDF() {
    var pdf = new jsPDF();
    var qrImg = $("#qrArea img");

    pdf.addImage(qrImg.attr("src"), 'PNG', 25, 25);
    pdf.save("qrcode.pdf");
  }

  options.event.on('ready', init);

}(options));
