


const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");

let mysectetkey="pk_test_51Q4PKnGzUfJnYPQCLvkcM47zK2LB6CUHfytL9HxdB3Dq26C5OSFJCOVbp5keKbQnCwNlNBDP48SmFahyWxXfuI6D00ExeqJdqD"

const stripe=require("stripe")(mysectetkey)

