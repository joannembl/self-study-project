package com.example.vertx_api_project;

import java.util.concurrent.atomic.AtomicInteger;

public class User {

  private static final AtomicInteger COUNTER = new AtomicInteger();

  private final int id;
  private String firstName;
  private String lastName;
  private String jobTitle;
  private String location;

  public User(String firstName, String lastName, String jobTitle, String location){
    this.id = COUNTER.getAndIncrement();
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobTitle = jobTitle;
    this.location = location;
  }

  public User() {
    this.id = COUNTER.getAndIncrement();
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getJobTitle() {
    return jobTitle;
  }

  public String getLocation() {
    return location;
  }

  public int getId(){
    return id;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public void setJobTitle(String jobTitle) {
    this.jobTitle = jobTitle;
  }

  public void setLocation(String location) {
    this.location = location;
  }
}
