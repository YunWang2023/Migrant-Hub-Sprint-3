require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");

const Post = require("./models/postModel");
const Community = require("./models/communityModel");
const MustDo = require("./models/mustDoModel");

const communities = [
  {
    name: "Finland Newcomers",
    description:
      "A community for international students and newcomers in Finland to share experiences, ask questions and find useful advice.",
    memberCount: 42,
  },
  {
    name: "Indians in Helsinki",
    description:
      "Students and newcomers from India living in the Helsinki area - food, festivals, groceries and practical help.",
    memberCount: 18,
  },
];

const mustDoItems = [
  {
    slug: "dvv",
    title: "DVV Registration",
    summary: "Register your personal information and address in Finland with DVV.",
    whatIsIt:
      "DVV means Digital and Population Data Services Agency. When you move to Finland, you need to register that you are living here.",
    whoNeedsIt:
      "Students who arrive in Finland with a residence permit. At the same office you can also apply for a Vero tax card.",
    documents: [
      "Residence permit, if you have one",
      "Passport",
      "A Finnish address where you are living",
      "Study certificate showing that you are a student in Finland",
    ],
    howLong:
      "Book an appointment online, or go to the office and take a queue number. Waiting times vary. DVV emails you when the registration is complete.",
    officialUrl: "https://dvv.fi/en/foreigner-registration",
    officialLabel: "Registration of a foreigner - DVV",
    checkedOn: "2026-09-02",
    order: 1,
  },
  {
    slug: "police-residence-permit",
    title: "Residence Permit & Police",
    summary: "Verify your identity with the police.",
    whatIsIt:
      "Police identity verification means confirming who you are. It can be needed before a bank gives you banking services or online banking credentials.",
    whoNeedsIt:
      "Students who need proof of identity for services such as opening a bank account.",
    documents: [
      "Valid passport",
      "The original documents used in your residence permit application",
    ],
    howLong:
      "Book an appointment online or go to a police station. With an A permit, a police ID card usually arrives within about 15 days.",
    officialUrl:
      "https://poliisi.fi/en/making-an-appointment-and-coming-to-the-police-station",
    officialLabel: "Making an appointment - Police",
    checkedOn: "2026-09-02",
    order: 2,
  },
  {
    slug: "bank-account",
    title: "Open a Bank Account",
    summary: "Open a Finnish bank account to receive money and pay bills.",
    whatIsIt:
      "A bank account is used to manage your money in Finland. You can receive money, pay bills and use a bank card.",
    whoNeedsIt:
      "Students living and studying in Finland. Banks include OP, S-Pankki and Nordea.",
    documents: [
      "Valid passport or identity card",
      "Residence permit or proof of your right to stay in Finland",
      "Finnish personal identity code, if you have one",
      "Finnish address and contact information",
    ],
    howLong:
      "Depends on the bank. The card and documents usually arrive within about 15 working days.",
    officialUrl: "https://www.op.fi/en/home-page",
    officialLabel: "OP - personal customers",
    checkedOn: "2026-09-02",
    order: 3,
  },
  {
    slug: "hsl",
    title: "HSL Travel Card",
    summary: "Get the right HSL ticket for buses, trams, trains and the metro.",
    whatIsIt:
      "HSL runs public transport in the Helsinki region. You need a valid ticket for buses, trams, the metro, local trains and the Suomenlinna ferry.",
    whoNeedsIt:
      "Anyone using public transport in the Helsinki region. Full-time students can apply for a student discount on season tickets.",
    documents: [
      "Proof of student status for the discount",
      "The HSL app, or a travel card from a service point",
    ],
    howLong:
      "Tickets can be bought in the HSL app immediately. The student discount is applied for separately.",
    officialUrl: "https://www.hsl.fi/en",
    officialLabel: "HSL - Helsinki Region Transport",
    checkedOn: "2026-09-02",
    order: 4,
  },
  {
    slug: "tuudo",
    title: "Tuudo",
    summary: "The app for your digital student card and study information.",
    whatIsIt:
      "Tuudo is a mobile app used by many Finnish higher education institutions. It holds your digital student card and gives access to study information and campus services.",
    whoNeedsIt:
      "Students at institutions that use Tuudo. Sign in with your university account.",
    documents: ["Your university username and password"],
    howLong:
      "Download the app and sign in. The digital student card is usually available straight away.",
    officialUrl: "https://tuudo.fi/",
    officialLabel: "Tuudo",
    checkedOn: "2026-09-02",
    order: 5,
  },
  {
    slug: "housing",
    title: "Find Student Housing",
    summary: "Apply for student housing early - the queues are long.",
    whatIsIt:
      "HOAS is the largest student housing provider in the Helsinki region. There are also other student housing foundations and the private rental market.",
    whoNeedsIt: "Students who need somewhere to live in the Helsinki region.",
    documents: [
      "Proof of study place or student status",
      "Your personal and contact details",
    ],
    howLong:
      "Apply as early as possible. Waiting times can be long, especially before the autumn semester.",
    officialUrl: "https://www.hoas.fi/en/",
    officialLabel: "HOAS - Student housing",
    checkedOn: "2026-09-02",
    order: 6,
  },
];

const buildPosts = (newcomersId, indiansId) => [
  {
    title: "A Ferry Trip to Suomenlinna",
    body: "Today, I visited Suomenlinna, a beautiful historic sea fortress near Helsinki. I first went to Helsinki city centre and took a ferry to Suomenlinna. The journey took around 15-20 minutes and offered beautiful views of the sea and Helsinki. If you have a valid HSL AB-zone ticket, there is no need to buy a separate ferry ticket. Suomenlinna was peaceful and beautiful, with historic buildings, stone walls, walking paths, and amazing sea views. It was a wonderful short trip!",
    author: "Prabhleen Kaur",
    category: "Places",
    tags: ["Suomenlinna", "Day Trip", "HSL"],
    aiTeaser:
      "A short ferry ride from Helsinki city centre reaches Suomenlinna, a historic sea fortress with stone walls, walking paths and wide sea views.",
    communityId: newcomersId,
  },
  {
    title: "My First Visit to Oodi Library",
    body: "Today, I visited Oodi Library in Helsinki, and it was my first experience visiting such a huge library. I was amazed by its beautiful design, peaceful atmosphere, and open spaces. I would suggest that anyone interested in reading books and exploring new things should visit Oodi. It is much more than just a library, with study areas, books, computers, and places to relax. My visit was a wonderful and memorable experience.",
    author: "Yun Wang",
    category: "Study",
    tags: ["Oodi", "Library", "Helsinki"],
    aiTeaser:
      "Oodi is far more than a library - study areas, computers and open space in the centre of Helsinki, free to use.",
    communityId: newcomersId,
  },
  {
    title: "My Visit to Delhi Rasoi: An Indian Food Experience in Helsinki",
    body: "Today, I had the opportunity to visit an Indian cuisine restaurant in Helsinki called Delhi Rasoi, and it was a wonderful experience. As someone who enjoys Indian food, I was excited to try the restaurant and experience its flavours. The food was delicious and full of flavour. It was a great experience to enjoy Indian cuisine while living in Finland. I would recommend this restaurant to anyone who enjoys Indian food and is looking for a good dining experience in Helsinki.",
    author: "Sehwinder Singh",
    category: "Food",
    tags: ["Indian Food", "Helsinki", "Restaurants"],
    aiTeaser:
      "Delhi Rasoi in Helsinki serves Indian food worth the trip if you are missing flavours from home.",
    communityId: indiansId,
  },
  {
    title: "How to Find an Apartment in Finland",
    body: "Finding a place to live is one of the first important steps after arriving in Finland. Before choosing an apartment, it is useful to compare the location, rent, transport connections and other costs. New students can look for student housing and other rental options. Check the application requirements carefully and prepare the documents you need before applying. Think about your daily travel when choosing a location. A home that is close to public transport can make studying and everyday life easier. Also remember to check the rental conditions before signing an agreement.",
    author: "Pratham Arora",
    category: "Housing",
    tags: ["Housing", "HOAS", "Newcomers"],
    aiTeaser:
      "The basic steps for finding accommodation in Finland, from comparing locations and rent to preparing your application.",
    communityId: newcomersId,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Post.deleteMany({});
    await Community.deleteMany({});
    await MustDo.deleteMany({});
    console.log("Old data removed");

    const savedCommunities = await Community.insertMany(communities);
    const newcomersId = savedCommunities[0]._id.toString();
    const indiansId = savedCommunities[1]._id.toString();

    const savedMustDo = await MustDo.insertMany(mustDoItems);
    const savedPosts = await Post.insertMany(buildPosts(newcomersId, indiansId));

    console.log(`Communities: ${savedCommunities.length}`);
    console.log(`Must Do items: ${savedMustDo.length}`);
    console.log(`Posts: ${savedPosts.length}`);
    console.log("Seeding complete");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedDatabase();