export  class ApplicationError extends Error {
    public code: number;

    constructor(code: number, message: string, ) {
        super();
        this.code = code;
        this.message = message || 'Unknown error';
    }
}


export class InvalidEventObject extends ApplicationError {
    constructor() {
      super(400, 'Invalid event object');
    }
  }

  export class NodeGroupNotFound extends ApplicationError {
    constructor(nodeGroupId: string) {
      super(404, `There is no Node Group with ${nodeGroupId} id`);
    }
  }
  
  export class InterviewersNotFoud extends ApplicationError {
    constructor() {
      super(404, 'There is no interviewers');
    }
  }

  export class CreateEventFailed extends ApplicationError {
    constructor(eventObject) {
      super(500, `Failed to create eventObject: ${eventObject}`);
    }
  }

  export class MongooseConnectionFailed extends ApplicationError {
    constructor() {
      super(500, 'Mongoose connection failed');
    }
}