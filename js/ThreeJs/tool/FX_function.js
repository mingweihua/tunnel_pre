class FX_function {
    static showFX(object,position,a,chartid) {
        let name ="html/"+ object.currentName.split("Model")[0]+"_"+a+"_"+position+".html";
        document.getElementById(chartid ).innerHTML = '<object type="text/html" data=" '+ name + '" width="80%" height="100%" ></object>';
        // console.log(name);
    }
    static showPDF(object,position,a) {
        let name = "pdf/"+object.currentName.split("Model")[0]+"_"+a+"_"+position+".pdf";
        window.open(name);
    }
    static showFX1(object,a,chartid) {
        let name ="html/"+ object.currentName.split("Model")[0]+"_"+a+".html";
        console.log(name);
        document.getElementById(chartid ).innerHTML = '<object type="text/html" data=" '+ name + '" width="80%" height="100%" ></object>';
    }
    static showPDF1(object,a) {
        let name = "pdf/"+object.currentName .split("Model")[0]+"_"+a+".pdf";
        window.open(name);
    }
}