class Config {
  public WebPort = 4000;
  public mySQLhost = process.env.MYSQL_HOST;
  public mySQLuser = "root";
  public mySQLpass = "12345678";
  public mySQLdatabase = "travel";
}

const config = new Config();
export default config;
