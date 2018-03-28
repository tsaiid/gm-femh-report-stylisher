// ==UserScript==
// @name         FEMH Intra Report Stylisher
// @namespace    https://tsai.it/project/gmscripts/femh-report-stylisher/
// @version      0.1
// @description  Re-style the pathology report webpage
// @author       I-Ta Tsai
// @license      MIT
// @match        http://intralab.ad.femh.local:8080/DataPah.aspx*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @resource     bootstrapCSS https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css
// @resource     bootstrapDarklyCSS https://maxcdn.bootstrapcdn.com/bootswatch/4.0.0/darkly/bootstrap.min.css
// @grant        GM_getResourceURL
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

// For debug: to require jquery in console.
// var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.2.1.min.js";document.getElementsByTagName('head')[0].appendChild(script);

this.$ = this.jQuery = jQuery.noConflict(true);

document.head.appendChild(cssElement(GM_getResourceURL("bootstrapDarklyCSS")));

function cssElement(url) {
  var link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";
  link.type = "text/css";
  return link;
}

GM_addStyle(`
html {
  font-size: 18px !important;
}

body {
  font-family: "微軟正黑體" !important;
}

pre {
  color: #fff !important;
  white-space: pre-wrap;       /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}

th {
  background-color: #444;
}

.fixed-th-width {
  width: 9rem;
}

@media (min-width: 576px) {
.container {
    max-width: none;
}
}
`);

(function () {
  'use strict';

  // get value
  var exam_name = $('#TextBox1').val();
  var exam_time = $('#TextBox2').val();
  var report_time = $('#TextBox3').val();
  var report_doc = $('#TextBox8').val();
  var report_no = $('#TextBox7').val();
  var pre_dx = $('#TextBox4').val();
  var post_dx = $('#TextBox5').val();
  var report_txt = $('#TextBox6').val();
  var malignant_txt = $('#Label8').text();

  // remove original body
  $('body').remove();

  // remove original style
  $('#style-1-cropbar-clipper').remove();

  // create new body
  var newbody = document.createElement("body");
  $(newbody).html(`
<div class="container mt-3">
  <table class="table table-bordered">
    <tbody>
      <tr>
        <th scope="row">檢驗名稱</th>
        <td colspan="3">${exam_name}</td>
      </tr>
      <tr>
        <th scope="row" class="fixed-th-width">簽收時間</th>
        <td>${exam_time}</td>
        <th scope="row" class="fixed-th-width">報告時間</th>
        <td>${report_time}</td>
      </tr>
      <tr>
        <th scope="row">報告醫師</th>
        <td>${report_doc}</td>
        <th scope="row">病理編號</th>
        <td>${report_no}</td>
      </tr>
      <tr>
        <th scope="row">檢驗前診斷名稱</th>
        <td colspan="3">${pre_dx}</td>
      </tr>
    </tbody>
  </table>

  <div class="row">
    <div class="col-sm-12">
      <div class="card mb-3">
        <h6 class="card-header">
          檢驗後診斷名稱
        </h6>
        <div class="card-body">
          <p class="card-text">${post_dx}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <h6 class="card-header">
          Report <span>${malignant_txt}</span>
        </h6>
        <div class="card-body">
          <pre class="card-text">${report_txt}</pre>
        </div>
      </div>
    </div>
  </div>
</div>
`);
  $("html").append(newbody);
})();
