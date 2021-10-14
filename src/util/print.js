export function print(id){
    var docHead = document.head.outerHTML;
    var printContents = document.getElementById(id).innerHTML;
    var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

    var newWin = window.open("", "_blank", winAttr);
    var writeDoc = newWin.document;
    writeDoc.open();
    writeDoc.write('<!doctype html><html> <style> .fc-header-toolbar{display:none !important;} .fc-scroller.fc-scroller-liquid{overflow:visible !important;} .fc-view-harness.fc-view-harness-active{height:auto !important;}</style>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
    writeDoc.close();
    newWin.focus();
}