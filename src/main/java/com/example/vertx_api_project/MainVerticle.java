package com.example.vertx_api_project;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Handler;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.mysqlclient.MySQLConnectOptions;
import io.vertx.sqlclient.*;

import java.util.LinkedHashMap;
import java.util.Map;

public class MainVerticle extends AbstractVerticle {

  //Store user
  //private Map<Integer, User> users = new LinkedHashMap<>();

  @Override
  public void start(Promise<Void> startPromise) {

    MySQLConnectOptions options = new MySQLConnectOptions()
      .setPort(3306)
      .setHost("localhost")
      .setDatabase("inventory_app_project")
      .setUser("root")
      .setPassword("");

    Pool pool = Pool.pool(vertx, options, new PoolOptions().setMaxSize(4));

//    createSomeData(pool);

    //Create router object
    Router router = Router.router(vertx);

    router.route("/").handler(routingContext -> {
      HttpServerResponse response = routingContext.response();
      response.putHeader("content-type", "text/html")
        .end("<h1>Hello from Vert.x World!");
    });

    router.route("/assets/*").handler(StaticHandler.create("assets"));

    router.get("/api/users").handler(getAll(pool));
    router.route("/api/users*").handler(BodyHandler.create());
    router.post("/api/users").handler(addOne(pool));
    router.get("/api/users/:id").handler(getOne(pool));
    router.put("/api/users/:id").handler(updateOne(pool));
    router.delete("/api/users/:id").handler(deleteOne(pool));


    vertx
      .createHttpServer().requestHandler(router)
      .listen(8000, http -> {
      if (http.succeeded()) {
        startPromise.complete();
        System.out.println("HTTP server started on port 8000");
      } else {
        startPromise.fail(http.cause());
      }
    });
  }

//  private void createSomeData(Pool pool) {
//    User user1 = new User("Wyatt", "Templin", "Sales Consultant", "Phoenix, AZ");
//    users.put(user1.getId(), user1);
//  }

  private Handler<RoutingContext> getAll(Pool pool){
    return routingContext -> {
      JsonArray jsonArray = new JsonArray();
      pool
        .query("SELECT id, firstName, lastName, jobTitle, location FROM users")
        .execute(ar -> {
          if(ar.succeeded()) {
            RowSet<Row> rows = ar.result();
            for (Row row : rows) {
              JsonObject json = row.toJson();
              jsonArray.add(json);
            }
            routingContext
              .response()
              .setStatusCode(200)
              .end(Json.encodePrettily(jsonArray));
          } else {
            routingContext
              .response()
              .setStatusCode(400)
              .end(ar.cause().getMessage());
          }
        });
    };
  }

  //this adds an article to the readingList *CREATE*
  private Handler<RoutingContext> addOne(Pool pool){
    return routingContext -> {
      //create JSONObject from request body
      JsonObject userToAdd = routingContext.getBodyAsJson();

      String first_name = userToAdd.getString("firstName");
      String last_name = userToAdd.getString("lastName");
      String job_title = userToAdd.getString("jobTitle");
      String location = userToAdd.getString("location");

      pool
        .query("INSERT INTO users (firstName, lastName, jobTitle, location) VALUES ('"+first_name+"', '"+last_name+"', '"+job_title+"', '"+location+"')")
        .execute(ar -> {
          if(ar.succeeded()){
            routingContext
              .response()
              .setStatusCode(200)
              .end();
          } else {
            System.out.println(ar.cause().getMessage());
            routingContext
              .response()
              .setStatusCode(400)
              .end(ar.cause().getMessage());
          }
        });
    };
  }

  private Handler<RoutingContext> getOne(Pool pool) {
    return routingContext -> {
      String id = routingContext.request().getParam("id");
      try {
        Integer idAsInteger = Integer.valueOf(id);
        pool
          .query("SELECT firstName, lastName, jobTitle, location FROM users WHERE id="+idAsInteger+"")
          .execute(ar -> {
            if(ar.succeeded()){
              RowSet<Row> rows = ar.result();
              for (Row row : rows) {
                JsonObject user = row.toJson();
                routingContext
                  .response()
                  .setStatusCode(200)
                  .end(Json.encodePrettily(user));
              }
            } else {
              routingContext
                .response()
                .setStatusCode(400)
                .end(ar.cause().getMessage());
            }
          });
      } catch (NumberFormatException e) {
        routingContext.response().setStatusCode(400).end();
      }
    };
  }

  private Handler<RoutingContext> updateOne(Pool pool) {
    return routingContext -> {
      String id = routingContext.request().getParam("id");
      JsonObject body = routingContext.getBodyAsJson();
      String first_name = body.getString("firstName");
      String last_name = body.getString("lastName");
      String job_title = body.getString("jobTitle");
      String location = body.getString("location");


      try {
        Integer idAsInteger = Integer.valueOf(id);
        pool
          .query("UPDATE users SET firstName='"+first_name+"', lastName='"+last_name+"', jobTitle='"+job_title+"', location='"+location+"' WHERE id="+idAsInteger+"")
          .execute(ar -> {
            if (ar.succeeded()){
              routingContext
                .response()
                .setStatusCode(200)
                .end();
            } else {
              routingContext
                .response()
                .setStatusCode(400)
                .end(ar.cause().getMessage());
            }
          });
      } catch (NumberFormatException e) {
        routingContext.response().setStatusCode(400).end();
      }
    };
  }

  private Handler<RoutingContext> deleteOne(Pool pool) {
    return routingContext -> {
      //get id from parameters of request
      String id = routingContext.request().getParam("id");
      try {
        //convert id to integer
        Integer idAsInteger = Integer.valueOf(id);
        pool
          .query("DELETE FROM users WHERE id=" + idAsInteger + "")
          .execute(ar -> {
            if (ar.succeeded()) {
              routingContext
                .response()
                .setStatusCode(200)
                .end();
            } else {
              routingContext
                .response()
                .setStatusCode(400)
                .end(ar.cause().getMessage());
            }
          });
      } catch (NumberFormatException nfe) {
        routingContext.response().setStatusCode(400).end();
        // ^ just in case String ID could not be converted
      }
    };
  }
  }
