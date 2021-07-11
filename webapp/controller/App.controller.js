sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict"
    return Controller.extend("sap.ui.demo.walkthrough.App", {

        onInit: function () {
            //Set datamodel as JSON
            var oData = {
                user: [{
                    id: 1,
                    firstname: "Abigail",
                    lastname: "Lynn"
                },
                {
                    id: 2,
                    firstname: "Jason",
                    lastname: "Barker"
                },
                {
                    id: 3,
                    firstname: "Nancy",
                    lastname: "Brown"
                }
                ]
            };

            //Assign model to view so we can acces model properties with schema -> {modelName>Propertiename} e.g. {userData>firstname}
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "userData");
        },

        onAddUserPress: function () {
            //Get input values and validate
            var firstName = this.getView().byId("appInputFirstName").getValue();
            var lastName = this.getView().byId("appInputLastName").getValue();

            if (firstName === "" || lastName === "") {
                MessageToast.show("Please enter a first and lastname");
                return;
            }

            //Get View assigned Model
            var model = this.getView().getModel('userData');
            var localdata = model.getData();

            //Access JSON properties
            var moreData = [];
            var newJsonEntity = {};

            var oTable = this.getView().byId("userTable");
            var oRowsBinding = oTable.getBinding("rows");

            //Generate next highest new id
            var newId = oRowsBinding.getLength() + 1;

            newJsonEntity['id'] = newId;
            newJsonEntity['firstname'] = firstName;
            newJsonEntity['lastname'] = lastName;

            //Push new Data to JSONModel
            localdata.user.push(newJsonEntity);
            model.setData(localdata);

            //Clear input values
            this.clearInputControls();
        },

        onRemoveUserPress: function () {
            //Get current selected itemIndex
            var oTable = this.getView().byId("userTable");
            var oSelectedItemIndex = oTable.getSelectedIndex();

            if (oSelectedItemIndex !== -1) {
                var oModel = oTable.getModel('userData');
                var items = oModel.getProperty("/user");;
                items.splice(oSelectedItemIndex, 1); //remove 1 single item
                oModel.setProperty("/user", items);

            } else {
                sap.m.MessageToast.show('Please select a row');
            }
        },

        clearInputControls: function () {
            this.getView().byId("appInputFirstName").setValue("");
            this.getView().byId("appInputLastName").setValue("");
        }
    });
});