// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// directUrl = env("DIRECT_URL")
// }

// generator client {
//   provider = "prisma-client-js"
// }

// model User {
//   id           String     @id @default(uuid())
//   firstName    String
//   lastName     String
//   email        String     @unique
//   password     String
//   profileImage String?
//   phoneNumber  String?
//   role         UserRole
//   status       UserStatus @default(Active)
//   createdAt    DateTime   @default(now())
//   updatedAt    DateTime   @updatedAt

//   inquiries         Inquiry[]
//   followUps         FollowUp[]
//   properties        Property[]
//   inquiryActivities InquiryActivity[]

//   @@index([role, status])
//   @@index([createdAt])
//   @@map("users")
// }

// model Otp {
//   id        String   @id @default(uuid())
//   email     String   @unique
//   otp       String
//   expiresAt DateTime

//   @@index([expiresAt])
// }

// model Inquiry {
//   id          String        @id @default(uuid())
//   agentId     String?
//   propertyId  String?
//   firstName   String
//   lastName    String
//   email       String
//   phoneNumber String
//   source      LeadSource    @default(Other)
//   status      InquiryStatus @default(New)
//   interest    TInterest
//   message     String
//   createdAt   DateTime      @default(now())
//   updatedAt   DateTime      @updatedAt

//   agent             User?             @relation(fields: [agentId], references: [id])
//   property          Property?         @relation(fields: [propertyId], references: [id])
//   followUps         FollowUp[]
//   inquiryActivities InquiryActivity[]

//   @@index([email])
//   @@index([interest, createdAt])
//   @@index([propertyId])
//   @@index([agentId])
//   @@map("inquiries")
// }

// model InquiryActivity {
//   id        String       @id @default(uuid())
//   inquiryId String
//   actorId   String
//   type      ActivityType
//   fromValue String?
//   toValue   String?
//   note      String?
//   createdAt DateTime     @default(now())
//   updatedAt DateTime     @updatedAt

//   inquiry Inquiry @relation(fields: [inquiryId], references: [id])
//   actor   User    @relation(fields: [actorId], references: [id])

//   @@index([inquiryId, createdAt])
//   @@index([actorId])
//   @@map("inquiry_activities")
// }

// model FollowUp {
//   id           String       @id @default(uuid())
//   inquiryId    String
//   agentId      String
//   type         FollowUpType
//   notes        String?
//   nextActionAt DateTime?
//   createdAt    DateTime     @default(now())
//   updatedAt    DateTime     @updatedAt

//   inquiry Inquiry @relation(fields: [inquiryId], references: [id])
//   agent   User    @relation(fields: [agentId], references: [id])

//   @@index([inquiryId])
//   @@index([agentId])
//   @@index([nextActionAt])
//   @@map("follow_ups")
// }

// model Property {
//   id             String          @id @default(uuid())
//   creatorId      String
//   referenceCode  String          @unique
//   title          String
//   location       String
//   price          Decimal         @db.Decimal(12, 2)
//   propertyType   TPropertyType
//   propertyStatus TPropertyStatus
//   status         TStatus
//   bedrooms       Int
//   bathrooms      Int
//   area           Float
//   amenities      String[]
//   images         String[]
//   description    String
//   createdAt      DateTime        @default(now())
//   updatedAt      DateTime        @updatedAt
//   creator        User            @relation(fields: [creatorId], references: [id]) // Agent OR Admin who created the property

//   inquiries Inquiry[]

//   @@index([status, propertyType])
//   @@index([status, price])
//   @@index([propertyType, status, price])
//   @@index([bedrooms, bathrooms])
//   @@index([location])
//   @@index([price])
//   @@index([createdAt])
//   @@map("properties")
// }

// enum UserStatus {
//   Active
//   Blocked
//   Deleted
// }

// enum UserRole {
//   User
//   Agent
//   Admin
// }

// enum ActivityType {
//   StatusChange
//   AgentAssigned
//   AgentReassigned
//   SourceUpdated
//   NoteAdded
//   PropertyLinked
//   Created
//   Other
// }

// enum InquiryStatus {
//   New
//   Contacted
//   Qualified
//   Viewing
//   Offer
//   Closed
//   Lost
// }

// enum TInterest {
//   BuyingResidence
//   SellingProperty
//   RentingOrLeasing
//   CommercialAdvisory
//   Other
// }

// enum TPropertyType {
//   Apartment
//   Villa
//   Penthouse
//   TownHouse
//   Office
// }

// enum TStatus {
//   Rent
//   Sale
// }

// enum TPropertyStatus {
//   Draft
//   Published
//   Archived
// }

// enum LeadSource {
//   Website
//   WhatsApp
//   Property_Finder
//   Bayut
//   Manual_Entry
//   Social_Media
//   Other
// }

// enum FollowUpType {
//   Call
//   Email
//   Meeting
//   Note
// }
