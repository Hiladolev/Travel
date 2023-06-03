class Vacation {
  public id: number;
  public destination: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public price: number;
  public image: File;

  constructor(
    id: number,
    destination: string,
    description: string,
    startDate: string,
    endDate: string,
    price: number,
    image: File
  ) {
    this.id = id;
    this.destination = destination;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.image = image;
  }
}

export default Vacation;
