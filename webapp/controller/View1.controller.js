sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("project3.controller.View1", {

        onInit: function () {
            var oData = {
                newFruit: "",
                fruits: [],
                editIndex: null   
            };

            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onSubmit: function () {
            var oModel = this.getView().getModel();
            var sFruit = oModel.getProperty("/newFruit");
            var iEditIndex = oModel.getProperty("/editIndex");

            if (!sFruit) {
                return;
            }

            var aFruits = oModel.getProperty("/fruits");

            if (iEditIndex !== null) {
                aFruits[iEditIndex].name = sFruit;
                MessageToast.show("Fruit updated successfully");
                oModel.setProperty("/editIndex", null);
            } else {
                aFruits.push({ name: sFruit });
                MessageToast.show("Fruit added successfully");
            }

            oModel.setProperty("/fruits", aFruits);
            oModel.setProperty("/newFruit", "");
        },

        onEdit: function (oEvent) {
            var oItem = oEvent.getSource().getParent().getParent();
            var oContext = oItem.getBindingContext();
            var iIndex = oContext.getPath().split("/")[2];

            var oModel = this.getView().getModel();
            var sValue = oModel.getProperty("/fruits/" + iIndex + "/name");

            oModel.setProperty("/newFruit", sValue);
            oModel.setProperty("/editIndex", iIndex);

            MessageToast.show("Editing mode enabled");
        },

        onDelete: function (oEvent) {
            var oItem = oEvent.getSource().getParent().getParent();
            var oContext = oItem.getBindingContext();
            var iIndex = oContext.getPath().split("/")[2];

            var oModel = this.getView().getModel();
            var aFruits = oModel.getProperty("/fruits");

            aFruits.splice(iIndex, 1);
            oModel.setProperty("/fruits", aFruits);

            MessageToast.show("Fruit deleted");
        }

    });
});
