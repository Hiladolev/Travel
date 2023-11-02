class Config {
  public WebPort = process.env.PORT;
  public mySQLhost = "127.0.0.1";
  public mySQLuser = process.env.MYSQL_USER;
  public mySQLpass = process.env.MYSQL_PASSWORD;
  public mySQLdatabase = process.env.MYSQL_DATABASE;
}

const config = new Config();
export default config;
