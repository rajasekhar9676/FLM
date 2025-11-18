const mongoose = require('mongoose');
const Company = require('../models/Company');
require('dotenv').config();

const companies = [
  // Technology (Multiple)
  {
    name: 'TechCorp Solutions',
    industry: 'Technology',
    location: { city: 'San Francisco', country: 'USA' },
    website: 'https://techcorp.com',
    description: 'Leading provider of enterprise software solutions and cloud infrastructure',
    employees: 5000,
    founded: 2010,
    revenue: '$500M'
  },
  {
    name: 'CloudSync',
    industry: 'Technology',
    location: { city: 'Toronto', country: 'Canada' },
    website: 'https://cloudsync.com',
    description: 'Cloud storage and data synchronization services for businesses',
    employees: 2800,
    founded: 2015,
    revenue: '$320M'
  },
  {
    name: 'DataVault Systems',
    industry: 'Technology',
    location: { city: 'Seattle', country: 'USA' },
    website: 'https://datavault.com',
    description: 'Enterprise data management and analytics platform',
    employees: 3200,
    founded: 2012,
    revenue: '$410M'
  },
  
  // Energy
  {
    name: 'GreenEnergy Inc',
    industry: 'Energy',
    location: { city: 'Austin', country: 'USA' },
    website: 'https://greenenergy.com',
    description: 'Renewable energy solutions for sustainable future',
    employees: 1200,
    founded: 2015,
    revenue: '$200M'
  },
  {
    name: 'SolarPower Global',
    industry: 'Energy',
    location: { city: 'Phoenix', country: 'USA' },
    website: 'https://solarpower-global.com',
    description: 'Solar energy systems and sustainable power solutions',
    employees: 800,
    founded: 2017,
    revenue: '$150M'
  },
  
  // Healthcare
  {
    name: 'MediCare Systems',
    industry: 'Healthcare',
    location: { city: 'Boston', country: 'USA' },
    website: 'https://medicare-systems.com',
    description: 'Healthcare technology and patient management systems',
    employees: 3000,
    founded: 2008,
    revenue: '$400M'
  },
  {
    name: 'HealthTech Innovations',
    industry: 'Healthcare',
    location: { city: 'Chicago', country: 'USA' },
    website: 'https://healthtech-innovations.com',
    description: 'Digital health solutions and telemedicine platforms',
    employees: 1800,
    founded: 2014,
    revenue: '$280M'
  },
  
  // Finance
  {
    name: 'FinanceFlow',
    industry: 'Finance',
    location: { city: 'New York', country: 'USA' },
    website: 'https://financeflow.com',
    description: 'Digital banking and financial services platform',
    employees: 2500,
    founded: 2012,
    revenue: '$350M'
  },
  {
    name: 'WealthBridge',
    industry: 'Finance',
    location: { city: 'London', country: 'UK' },
    website: 'https://wealthbridge.com',
    description: 'Investment management and wealth advisory services',
    employees: 1500,
    founded: 2011,
    revenue: '$290M'
  },
  
  // Education
  {
    name: 'EduTech Global',
    industry: 'Education',
    location: { city: 'London', country: 'UK' },
    website: 'https://edutech-global.com',
    description: 'Online learning platforms and educational technology',
    employees: 1800,
    founded: 2014,
    revenue: '$180M'
  },
  {
    name: 'LearnSmart Academy',
    industry: 'Education',
    location: { city: 'Boston', country: 'USA' },
    website: 'https://learnsmart.com',
    description: 'AI-powered personalized learning solutions',
    employees: 950,
    founded: 2016,
    revenue: '$140M'
  },
  
  // Retail
  {
    name: 'RetailMax',
    industry: 'Retail',
    location: { city: 'Chicago', country: 'USA' },
    website: 'https://retailmax.com',
    description: 'E-commerce solutions and retail management systems',
    employees: 2200,
    founded: 2011,
    revenue: '$300M'
  },
  {
    name: 'ShopSmart Technologies',
    industry: 'Retail',
    location: { city: 'New York', country: 'USA' },
    website: 'https://shopsmart.com',
    description: 'Omnichannel retail technology and inventory management',
    employees: 1600,
    founded: 2013,
    revenue: '$240M'
  },
  
  // Automotive
  {
    name: 'AutoDrive Technologies',
    industry: 'Automotive',
    location: { city: 'Detroit', country: 'USA' },
    website: 'https://autodrive-tech.com',
    description: 'Autonomous vehicle technology and smart transportation',
    employees: 4000,
    founded: 2016,
    revenue: '$450M'
  },
  {
    name: 'EcoMotive Solutions',
    industry: 'Automotive',
    location: { city: 'Los Angeles', country: 'USA' },
    website: 'https://ecomotive.com',
    description: 'Electric vehicle technology and charging infrastructure',
    employees: 2100,
    founded: 2018,
    revenue: '$320M'
  },
  
  // Logistics
  {
    name: 'FoodChain Logistics',
    industry: 'Logistics',
    location: { city: 'Seattle', country: 'USA' },
    website: 'https://foodchain-logistics.com',
    description: 'Supply chain management and food distribution',
    employees: 1500,
    founded: 2013,
    revenue: '$250M'
  },
  {
    name: 'SwiftLogistics',
    industry: 'Logistics',
    location: { city: 'Miami', country: 'USA' },
    website: 'https://swiftlogistics.com',
    description: 'Global shipping and freight management services',
    employees: 2800,
    founded: 2010,
    revenue: '$420M'
  },
  
  // Pharmaceuticals
  {
    name: 'BioPharm Innovations',
    industry: 'Pharmaceuticals',
    location: { city: 'Zurich', country: 'Switzerland' },
    website: 'https://biopharm-innovations.com',
    description: 'Biotechnology and pharmaceutical research',
    employees: 3500,
    founded: 2009,
    revenue: '$600M'
  },
  {
    name: 'MediResearch Labs',
    industry: 'Pharmaceuticals',
    location: { city: 'Boston', country: 'USA' },
    website: 'https://mediresearch.com',
    description: 'Clinical research and drug development',
    employees: 2400,
    founded: 2011,
    revenue: '$480M'
  },
  
  // Media
  {
    name: 'MediaStream',
    industry: 'Media',
    location: { city: 'Los Angeles', country: 'USA' },
    website: 'https://mediastream.com',
    description: 'Digital media streaming and content distribution',
    employees: 2000,
    founded: 2017,
    revenue: '$280M'
  },
  {
    name: 'ContentHub Studios',
    industry: 'Media',
    location: { city: 'New York', country: 'USA' },
    website: 'https://contenthub.com',
    description: 'Content creation and digital media production',
    employees: 1200,
    founded: 2015,
    revenue: '$190M'
  },
  
  // Real Estate
  {
    name: 'RealEstate Pro',
    industry: 'Real Estate',
    location: { city: 'Miami', country: 'USA' },
    website: 'https://realestate-pro.com',
    description: 'Property management and real estate technology',
    employees: 1200,
    founded: 2014,
    revenue: '$150M'
  },
  {
    name: 'PropertyTech Solutions',
    industry: 'Real Estate',
    location: { city: 'San Francisco', country: 'USA' },
    website: 'https://propertytech.com',
    description: 'Smart building technology and property analytics',
    employees: 900,
    founded: 2016,
    revenue: '$130M'
  },
  
  // Travel
  {
    name: 'TravelWise',
    industry: 'Travel',
    location: { city: 'Paris', country: 'France' },
    website: 'https://travelwise.com',
    description: 'Travel booking platform and tourism services',
    employees: 1600,
    founded: 2016,
    revenue: '$220M'
  },
  {
    name: 'Wanderlust Adventures',
    industry: 'Travel',
    location: { city: 'London', country: 'UK' },
    website: 'https://wanderlust.com',
    description: 'Adventure travel and experience booking platform',
    employees: 750,
    founded: 2018,
    revenue: '$110M'
  },
  
  // Agriculture
  {
    name: 'AgriTech Solutions',
    industry: 'Agriculture',
    location: { city: 'Sydney', country: 'Australia' },
    website: 'https://agritech-solutions.com',
    description: 'Agricultural technology and farming solutions',
    employees: 900,
    founded: 2018,
    revenue: '$120M'
  },
  {
    name: 'FarmSmart Systems',
    industry: 'Agriculture',
    location: { city: 'Chicago', country: 'USA' },
    website: 'https://farmsmart.com',
    description: 'Precision agriculture and IoT farming solutions',
    employees: 650,
    founded: 2019,
    revenue: '$95M'
  },
  
  // Sports
  {
    name: 'SportsTech',
    industry: 'Sports',
    location: { city: 'Denver', country: 'USA' },
    website: 'https://sportstech.com',
    description: 'Sports analytics and performance tracking technology',
    employees: 600,
    founded: 2019,
    revenue: '$80M'
  },
  {
    name: 'FitTrack Pro',
    industry: 'Sports',
    location: { city: 'San Francisco', country: 'USA' },
    website: 'https://fittrack.com',
    description: 'Fitness tracking and sports performance analytics',
    employees: 450,
    founded: 2020,
    revenue: '$65M'
  },
  
  // Security
  {
    name: 'CyberSecure',
    industry: 'Security',
    location: { city: 'Tel Aviv', country: 'Israel' },
    website: 'https://cybersecure.com',
    description: 'Cybersecurity solutions and threat protection',
    employees: 1800,
    founded: 2013,
    revenue: '$240M'
  },
  {
    name: 'SecureNet Systems',
    industry: 'Security',
    location: { city: 'Washington', country: 'USA' },
    website: 'https://securenet.com',
    description: 'Enterprise security and network protection services',
    employees: 2200,
    founded: 2012,
    revenue: '$310M'
  },
  
  // Fashion
  {
    name: 'FashionForward',
    industry: 'Fashion',
    location: { city: 'Milan', country: 'Italy' },
    website: 'https://fashionforward.com',
    description: 'Fashion e-commerce and design platform',
    employees: 1100,
    founded: 2015,
    revenue: '$170M'
  },
  {
    name: 'StyleHub',
    industry: 'Fashion',
    location: { city: 'New York', country: 'USA' },
    website: 'https://stylehub.com',
    description: 'Fashion tech and sustainable clothing solutions',
    employees: 850,
    founded: 2017,
    revenue: '$140M'
  },
  
  // Construction
  {
    name: 'ConstructionPlus',
    industry: 'Construction',
    location: { city: 'Houston', country: 'USA' },
    website: 'https://constructionplus.com',
    description: 'Construction management and building technology',
    employees: 2400,
    founded: 2010,
    revenue: '$380M'
  },
  {
    name: 'BuildSmart Technologies',
    industry: 'Construction',
    location: { city: 'Chicago', country: 'USA' },
    website: 'https://buildsmart.com',
    description: 'Smart building solutions and construction automation',
    employees: 1800,
    founded: 2014,
    revenue: '$290M'
  },
  
  // Entertainment
  {
    name: 'EntertainmentHub',
    industry: 'Entertainment',
    location: { city: 'Vancouver', country: 'Canada' },
    website: 'https://entertainmenthub.com',
    description: 'Entertainment production and digital content',
    employees: 1300,
    founded: 2017,
    revenue: '$190M'
  },
  {
    name: 'GameStudio Pro',
    industry: 'Entertainment',
    location: { city: 'Seattle', country: 'USA' },
    website: 'https://gamestudio.com',
    description: 'Game development and interactive entertainment',
    employees: 950,
    founded: 2016,
    revenue: '$160M'
  },
  
  // Telecommunications
  {
    name: 'TelecomGlobal',
    industry: 'Telecommunications',
    location: { city: 'Singapore', country: 'Singapore' },
    website: 'https://telecomglobal.com',
    description: 'Global telecommunications and network services',
    employees: 5000,
    founded: 2005,
    revenue: '$800M'
  },
  {
    name: 'ConnectWorld',
    industry: 'Telecommunications',
    location: { city: 'London', country: 'UK' },
    website: 'https://connectworld.com',
    description: '5G networks and telecommunications infrastructure',
    employees: 3200,
    founded: 2013,
    revenue: '$520M'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/companies_directory');

    console.log('Connected to MongoDB');

    // Clear existing data
    await Company.deleteMany({});
    console.log('Cleared existing companies');

    // Insert seed data
    await Company.insertMany(companies);
    console.log(`Seeded ${companies.length} companies`);

    await mongoose.connection.close();
    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
