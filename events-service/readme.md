# Event Queue Triggeer

## Queue Storage Triggeer

listen to events-queue

## Event Interface

{
    nodeId: string,
    malshabId: string,
    time: Date,
    location: string, 
    interviewersIds: Array<ObjectId>,
    status: Status,
    url?: string
 }


### Request message example

{
    nodeId:"601c73d4324ab7225ca77c36",
    malshabId:"507f1f77bcf86cd799439034",
    time:"2021-02-07T08:48:10.081Z",
    location:"location",
    status:"Status2",
    url:"url"
};

### Created Event Example

{
	"_id" : ObjectId("60214df4fceb57960978a309"),
	"interviewersIds" : [
		ObjectId("507f1f77bcf86cd369439011")
	],
	"nodeId" : "601c73d4324ab7225ca77c36",
	"malshabId" : "507f1f77bcf86cd799439034",
	"time" : {
		"$date" : 1610009290081
	},
	"location" : "loc",
	"status" : "Status2",
	"url" : "url",
	"__v" : 0
}
    

## Error Codes
Example : 

    {
    "message": "Invalid event object",
    "status": 400
    }

Error codes and meanings:
* 200 - OK
* 400 - Validation Error
* 404 - Not Found Error
* 500 - Server Code Error


