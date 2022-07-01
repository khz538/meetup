# Remove the database file (if run multiple times - not in README)
rm db/dev.db 2> /dev/null || true

# Generate Group model & migration
npx sequelize model:generate --name Group --attributes organizerId:integer,name:string,about:string,type:string,private:boolean,city:string,state:string,createdAt:date,updatedAt:date,numMembers:integer,previewImage:string

# Generate GroupMember model & migration
npx sequelize model:generate --name GroupMember --attributes userId:integer,groupId:integer,membershipStatus:string

# Generate Event model & migration
npx sequelize model:generate --name Event --attributes groupId:integer,venueId:integer,name:string,description:string,type:string,capacity:integer,price:integer,startDate:date,endDate:date,numAttending:integer

# Generate Venue model & migration
npx sequelize model:generate --name Venue --attributes address:string,city:string,state:string,latitude:float,longitude:float

# Generate EventAttendee model & migration
npx sequelize model:generate --name EventAttendee --attributes userId:integer,eventId:integer,attendingStatus:string

# Generate Image model & migration
npx sequelize model:generate --name Image --attributes eventId:integer,groupId:integer,url:string

