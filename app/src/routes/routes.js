/**
 * Created by reharik on 7/26/15.
 */

"use strict";

module.exports = function(koarouter, controllers, koaconvert, papersConfig) {
    var secured = async function (next) {
        if (this.isAuthenticated()) {
            await next;
        } else {
            this.status = 401;
        }
    };

    return function(app){
//var clientController = require("../controllers/client.server.controller");
//var clientListController = require("../controllers/clientList.server.controller");
//var trainerController = require("../controllers/trainer.server.controller");
//var trainerListController = require("../controllers/trainerList.server.controller");
//    var indexController = require("../controllers/index.controller");
//    var authController = require("../controllers/auth.controller");
        var router = koarouter();
        router.get("/", controllers.indexController.index);
        router.get("/swagger", controllers.swaggerController.swagger);

        router.get("/auth", controllers.authController.checkAuth);
        router.post("/auth", controllers.authController.signIn);
        router.all("/signout", controllers.authController.signOut);

        router.get("/trainers", controllers.trainerListController.trainers);
        router.post("/trainer/hireTrainer", controllers.trainerController.hireTrainer);
        router.post("/trainer/updateTrainerInfo", controllers.trainerController.updateTrainerInfo);
        router.post("/trainer/updateTrainerContact", controllers.trainerController.updateTrainerContact);
        router.post("/trainer/updateTrainerAddress", controllers.trainerController.updateTrainerAddress);
        router.post("/trainer/updateTrainerPassword", controllers.trainerController.updateTrainerPassword);
        router.post("/trainer/updateTrainersClients", controllers.trainerController.updateTrainersClients);
        router.get("/trainer/:id", controllers.trainerController.getTrainer);

        router.get("/clients", controllers.clientListController.clients);
        router.post("/client/addClient", controllers.clientController.addClient);
        router.post("/client/updateClientInfo", controllers.clientController.updateClientInfo);
        router.post("/client/updateClientContact", controllers.clientController.updateClientContact);
        router.post("/client/updateClientAddress", controllers.clientController.updateClientAddress);
        router.get("/client/:id", controllers.clientController.getClient);

        router.get("/fetchAppointments", controllers.appointmentController.fetchAppointments);
        router.get("/fetchAppointment/:id", controllers.appointmentController.fetchAppointment);
        router.post("/appointment/scheduleAppointment", controllers.appointmentController.scheduleAppointment);


        app.use(router.routes());
        app.use(router.allowedMethods());

        // secured routes
        //this is one way of doing it.  You could also create a new router "var securedRouter = new Router();
        //that handles all routes in say /app which has the secured middleware
        //then all routes registered in securedRouter will be secured
        //app.get("/clients", secured, clientListController.clients);
        //app.post("/client/create", secured, clientController.create);
        //  app.get("/trainers", secured, trainerListController.trainers);
        //  app.post("/trainer/create", secured, trainerController.create);

    };
};