// Import the dev-dependencies
import { chai, Credentials, Room } from "../common";

const apiPath = "http://localhost:8888/api/v1/Room/";

export const roomTest = (params: Credentials) => {
  describe("Room", () => {
    let roomId: string;
    const testRoom = {
      name: "Test Room",
      color: "Test Color",
      presence: false
    }	;

    before(async function() {
      // Create test room
      const createdRoom: any = await Room.create(testRoom);
      roomId = createdRoom.id.toString();
    });

    after(async function() {
      // Delete room if it still exists after the delete test.
      const room: any = await Room.findOne({
        where: { id: roomId }
      });
      if (room) {
        await Room.destroy({where: { id: roomId }});
      }
    });

    /*
    * Test the /GET route
    */
    describe("GET", () => {
      it("it should get the room", (done) => {
        chai.request(apiPath)
            .get(roomId)
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an("object");
              res.body.should.have.property("id");
              res.body.should.have.property("name");
              res.body.should.have.property("color");
              res.body.should.have.property("presence");
              res.body.should.have.property("updated_at");
              res.body.should.have.property("created_at");
              done();
            });
      });

      it("it should not get the room if it does not exist", (done) => {
        chai.request(apiPath)
            .get("100")
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.an("string").and.equal("Not Found");
              done();
            });
      });

      it("it should not get the room if params.token is not correct", (done) => {
        chai.request(apiPath)
            .get(roomId)
            .set("Authorization", "")
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                message: "jwt must be provided",
                name: "JsonWebTokenError"
              });
              done();
            });
      });

      it("it should not get the room if params.token is not provided", (done) => {
        chai.request(apiPath)
            .get(roomId)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("string").and.equal("No Token Present");
              done();
            });
      });

      it("it should not get the room if params.token is blacklisted", (done) => {
        chai.request(apiPath)
            .get(roomId)
            .set("Authorization", params.blackListedToken)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                name: "Error",
                message: "This Token is blacklisted"
              });
              done();
            });
      });
    });

    /*
    * Test the /POST route
    */
    describe("POST", () => {
      const createdRoom = {
        name: "Created Room",
        color: "Created Color",
        presence: true
      };

      after(async function() {
        // Delete the created room.
        const room: any = await Room.findOne({
          where: createdRoom
        });
        if (room) {
          await Room.destroy({where: { id: room.id }});
        }
      });

      it("it should create a new room", (done) => {
        chai.request(apiPath)
            .post("")
            .type("form")
            .send(createdRoom)
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an("object");
              res.body.should.have.property("id");
              res.body.should.have.property("name");
              res.body.should.have.property("color");
              res.body.should.have.property("presence");
              res.body.should.have.property("updated_at");
              res.body.should.have.property("created_at");
              done();
            });
      });

      it("it should not create a new room if name and color are not unique", (done) => {
        chai.request(apiPath)
            .post("")
            .type("form")
            .send(testRoom)
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a("string").and.equal("Bad Request: name and color must be uniques")
              done();
            });
      });

      it("it should not create a new room if params.token is not correct", (done) => {
        chai.request(apiPath)
            .post("")
            .type("form")
            .send(createdRoom)
            .set("Authorization", "")
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                message: "jwt must be provided",
                name: "JsonWebTokenError"
              });
              done();
            });
      });

      it("it should not create a new room if params.token is not provided", (done) => {
        chai.request(apiPath)
            .post("")
            .type("form")
            .send(createdRoom)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("string").and.equal("No Token Present");
              done();
            });
      });

      it("it should not create a new room if params.token is blacklisted", (done) => {
        chai.request(apiPath)
            .post("")
            .type("form")
            .send(createdRoom)
            .set("Authorization", params.blackListedToken)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                name: "Error",
                message: "This Token is blacklisted"
              });
              done();
            });
      });
    });

    /*
    * Test the /PUT route
    */
    describe("PUT", () => {
      const editedRoom = {
        name: "Edited Room",
        color: "Edited Color",
        presence: true
      }

      it("it should edit the room", (done) => {
        chai.request(apiPath)
            .put(roomId)
            .type("form")
            .send(editedRoom)
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an("object");
              res.body.should.have.property("id");
              res.body.should.have.property("name");
              res.body.should.have.property("color");
              res.body.should.have.property("presence");
              res.body.should.have.property("updated_at");
              res.body.should.have.property("created_at");
              done();
            });
      });

      it("it should not edit the room if it does not exist", (done) => {
        chai.request(apiPath)
            .put("100")
            .type("form")
            .send({
              name: "originalName",
              color: "originalColor"
            })
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(500); // Internal Server Error
              // res.body.should.be.an("string").and.equal("Not Found");
              res.body.should.be.an("object").and.deep.equal({});
              done();
            });
      });

      it("it should not edit the room if params.token is not correct", (done) => {
        chai.request(apiPath)
            .put(roomId)
            .type("form")
            .send(editedRoom)
            .set("Authorization", "")
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                message: "jwt must be provided",
                name: "JsonWebTokenError"
              });
              done();
            });
      });

      it("it should not edit the room if params.token is not provided", (done) => {
        chai.request(apiPath)
            .put(roomId)
            .type("form")
            .send(editedRoom)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("string").and.equal("No Token Present");
              done();
            });
      });

      it("it should not edit the room if params.token is blacklisted", (done) => {
        chai.request(apiPath)
            .put(roomId)
            .type("form")
            .send(editedRoom)
            .set("Authorization", params.blackListedToken)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                name: "Error",
                message: "This Token is blacklisted"
              });
              done();
            });
      });
    });

    /*
    * Test the /DELETE route
      Needs to be the last test for other tests to work.
    */
    describe("DELETE", () => {
      it("it should delete the room", (done) => {
        chai.request(apiPath)
            .delete(roomId)
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(204);
              res.body.should.be.an("object");
              done();
            });
      });

      it("it should not delete the room if it does not exist", (done) => {
        chai.request(apiPath)
            .delete(roomId)
            .set("Authorization", params.token)
            .end((err, res) => {
              res.should.have.status(404);
              // res.body.should.be.an("string").and.equal("Not Found");
              res.body.should.be.an("object").and.deep.equal({});
              done();
            });
      });

      it("it should not delete the room if params.token is not correct", (done) => {
        chai.request(apiPath)
            .delete(roomId)
            .set("Authorization", "")
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                message: "jwt must be provided",
                name: "JsonWebTokenError"
              });
              done();
            });
      });

      it("it should not delete the room if params.token is not provided", (done) => {
        chai.request(apiPath)
            .delete(roomId)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("string").and.equal("No Token Present");
              done();
            });
      });

      it("it should not delete the room if params.token is blacklisted", (done) => {
        chai.request(apiPath)
            .delete(roomId)
            .set("Authorization", params.blackListedToken)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.an("object").and.deep.equal({
                name: "Error",
                message: "This Token is blacklisted"
              });
              done();
            });
      });
    });
  });
};