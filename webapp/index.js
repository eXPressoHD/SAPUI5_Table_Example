sap.ui.define([
    "sap/ui/core/mvc/XMLView"

], function(XMLView) //Parse XMLView in constructor (always parse everything we define above)
{
    "use strict";

    XMLView.create({
        //Create view and find XMLView with name "App"
        viewName:"sap.ui.demo.walkthrough.view.App"
    }).then(function(oView){
        //Attach to "body id="content" in index.html
        oView.placeAt("content");
    });
});