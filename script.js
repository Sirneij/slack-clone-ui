var oDoc, sDefTxt;

function initDoc() {
  oDoc = document.getElementById("textBox");
  sDefTxt = oDoc.innerHTML;
  if (document.feedForm.switchMode.checked) {
    setDocMode(true);
  }
}

function formatDoc(sCmd, sValue) {
  if (validateMode()) {
    document.execCommand(sCmd, false, sValue);
    oDoc.focus();
  }
}

function validateMode() {
  if (!document.feedForm.switchMode.checked) {
    return true;
  }
  alert('Uncheck"Show HTML".');
  oDoc.focus();
  return false;
}

function setDocMode(bToSource) {
  var oContent;
  if (bToSource) {
    oContent = document.createTextNode(oDoc.innerHTML);
    oDoc.innerHTML = "";
    var oPre = document.createElement("pre");
    oDoc.contentEditable = false;
    oPre.id = "sourceText";
    oPre.contentEditable = true;
    oPre.appendChild(oContent);
    oDoc.appendChild(oPre);
    document.execCommand("defaultParagraphSeparator", false, "div");
  } else {
    if (document.all) {
      oDoc.innerHTML = oDoc.innerText;
    } else {
      oContent = document.createRange();
      oContent.selectNodeContents(oDoc.firstChild);
      oDoc.innerHTML = oContent.toString();
    }
    oDoc.contentEditable = true;
  }
  oDoc.focus();
}

function printDoc() {
  if (!validateMode()) {
    return;
  }
  var oPrntWin = window.open(
    "",
    "_blank",
    "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes"
  );
  oPrntWin.document.open();
  oPrntWin.document.write(
    '<!doctype html><html><head><title>Print</title></head><body onload="print();">' +
      oDoc.innerHTML +
      "</body></html>"
  );
  oPrntWin.document.close();
}

const closeSideBar = document.getElementById("close");
const sideBarWrapper = document.getElementById("sidebar-wrapper");
const sideBar = document.getElementById("user-sidebar");
const user = document.getElementById("user");

// sidebar
if (user) {
  user.addEventListener("click", () => {
    if (sideBarWrapper) {
      sideBarWrapper.classList.add("sidebar-wrapper-display");
    }
    if (sideBar) {
      sideBar.classList.add("user-sidebar-display");
    }
  });
}
if (closeSideBar) {
  closeSideBar.addEventListener("click", () => {
    sideBar.classList.remove("sidebar-display");
    sideBarWrapper.classList.remove("sidebar-wrapper-display");
  });
}

// click anywhere in the browser to close modals
window.onclick = (e) => {
  if (e.target == sideBarWrapper) {
    sideBar.classList.remove("sidebar-display");
    sideBarWrapper.classList.remove("sidebar-wrapper-display");
  }
};
