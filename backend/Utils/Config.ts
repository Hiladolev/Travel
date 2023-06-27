class Config {
  public WebPort = process.env.PORT;
  public mySQLhost = process.env.MYSQL_HOST;
  public mySQLuser = process.env.MYSQL_USER;
  public mySQLpass = process.env.MYSQL_PASSWORD;
  public mySQLdatabase = process.env.MYSQL_DATABASE;
}

const config = new Config();
export default config;
