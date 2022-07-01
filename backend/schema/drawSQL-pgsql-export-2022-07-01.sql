CREATE TABLE "user"(
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
CREATE TABLE "groups"(
    "id" INTEGER NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE NOT NULL,
    "numMembers" INTEGER NOT NULL,
    "previewImage" TEXT NOT NULL
);
ALTER TABLE
    "groups" ADD PRIMARY KEY("id");
CREATE TABLE "group_members"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "membershipStatus" TEXT NOT NULL
);
ALTER TABLE
    "group_members" ADD PRIMARY KEY("id");
CREATE TABLE "events"(
    "id" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "venueId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "numAttending" INTEGER NOT NULL,
    "previewImage" TEXT NOT NULL
);
ALTER TABLE
    "events" ADD PRIMARY KEY("id");
CREATE TABLE "event_attendees"(
    "id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "attendingStatus" TEXT NOT NULL
);
ALTER TABLE
    "event_attendees" ADD PRIMARY KEY("id");
CREATE TABLE "venues"(
    "id" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    "venues" ADD PRIMARY KEY("id");
CREATE TABLE "images"(
    "id" INTEGER NOT NULL,
    "eventId" INTEGER NULL,
    "groupId" INTEGER NULL,
    "url" TEXT NOT NULL
);
ALTER TABLE
    "images" ADD PRIMARY KEY("id");
ALTER TABLE
    "groups" ADD CONSTRAINT "groups_organizerid_foreign" FOREIGN KEY("organizerId") REFERENCES "user"("id");
ALTER TABLE
    "group_members" ADD CONSTRAINT "group_members_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "group_members" ADD CONSTRAINT "group_members_groupid_foreign" FOREIGN KEY("groupId") REFERENCES "groups"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_groupid_foreign" FOREIGN KEY("groupId") REFERENCES "groups"("id");
ALTER TABLE
    "events" ADD CONSTRAINT "events_venueid_foreign" FOREIGN KEY("venueId") REFERENCES "venues"("id");
ALTER TABLE
    "event_attendees" ADD CONSTRAINT "event_attendees_userid_foreign" FOREIGN KEY("userId") REFERENCES "user"("id");
ALTER TABLE
    "event_attendees" ADD CONSTRAINT "event_attendees_eventid_foreign" FOREIGN KEY("eventId") REFERENCES "events"("id");
ALTER TABLE
    "images" ADD CONSTRAINT "images_eventid_foreign" FOREIGN KEY("eventId") REFERENCES "events"("id");
ALTER TABLE
    "images" ADD CONSTRAINT "images_groupid_foreign" FOREIGN KEY("groupId") REFERENCES "groups"("id");