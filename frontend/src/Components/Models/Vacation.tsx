class Vacation {
  public destination: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public price: number;
  public image: File;
  public id?: number;

  constructor(
    destination: string,
    description: string,
    startDate: Date,
    endDate: Date,
    price: number,
    image: File,
    id?: number
  ) {
    this.destination = destination;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.image = image;
    this.id = id;
  }
}

export default Vacation;
