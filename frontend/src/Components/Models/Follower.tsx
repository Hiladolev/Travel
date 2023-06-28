class Follower {
  public userId: number;
  public vacationId: number;
  public followerId?: number;

  constructor(userId: number, vacationId: number, followerId?: number) {
    this.userId = userId;
    this.vacationId = vacationId;
    this.followerId = followerId;
  }
}
export default Follower;
