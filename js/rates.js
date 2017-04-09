// JS for the Meeting Cost Calculator

var app = app || {};

// Placeholder for actual rates of pay data
app.rates = [
  {
    "label": "AS-1",
    "description": "Administrative Services",
    "min": "48796",
    "median": "51685.5",
    "max": "54575"
  },
  {
    "label": "AS-2",
    "description": "Administrative Services",
    "min": "54374",
    "median": "56480",
    "max": "58586"
  },
  {
    "label": "AS-3",
    "description": "Administrative Services",
    "min": "58281",
    "median": "60537.5",
    "max": "62794"
  },
  {
    "label": "AS-4",
    "description": "Administrative Services",
    "min": "63663",
    "median": "66228",
    "max": "68793"
  },
  {
    "label": "AS-5",
    "description": "Administrative Services",
    "min": "76002",
    "median": "79086.5",
    "max": "82171"
  },
  {
    "label": "AS-6",
    "description": "Administrative Services",
    "min": "84658",
    "median": "87993",
    "max": "91328"
  },
  {
    "label": "AS-7",
    "description": "Administrative Services",
    "min": "89112",
    "median": "95502",
    "max": "101892"
  },
  {
    "label": "AS-8",
    "description": "Administrative Services",
    "min": "92014",
    "median": "100159.5",
    "max": "108305"
  },
  {
    "label": "CM-1",
    "description": "Communications",
    "min": "32695",
    "median": "32695",
    "max": "32695"
  },
  {
    "label": "CM-2",
    "description": "Communications",
    "min": "36172",
    "median": "36172",
    "max": "36172"
  },
  {
    "label": "CM-3",
    "description": "Communications",
    "min": "39890",
    "median": "39890",
    "max": "39890"
  },
  {
    "label": "CM-4",
    "description": "Communications",
    "min": "44299",
    "median": "44299",
    "max": "44299"
  },
  {
    "label": "CM-5",
    "description": "Communications",
    "min": "47693",
    "median": "47693",
    "max": "47693"
  },
  {
    "label": "CM-6",
    "description": "Communications",
    "min": "54876",
    "median": "54876",
    "max": "54876"
  },
  {
    "label": "CM-7",
    "description": "Communications",
    "min": "60132",
    "median": "60132",
    "max": "60132"
  },
  {
    "label": "CR-1",
    "description": "Clerical and Regulatory",
    "min": "33128",
    "median": "34864.5",
    "max": "36601"
  },
  {
    "label": "CR-2",
    "description": "Clerical and Regulatory",
    "min": "35958",
    "median": "37192",
    "max": "38426"
  },
  {
    "label": "CR-3",
    "description": "Clerical and Regulatory",
    "min": "40786",
    "median": "42389.5",
    "max": "43993"
  },
  {
    "label": "CR-4",
    "description": "Clerical and Regulatory",
    "min": "45189",
    "median": "46983",
    "max": "48777"
  },
  {
    "label": "CR-5",
    "description": "Clerical and Regulatory",
    "min": "49387",
    "median": "51426.5",
    "max": "53466"
  },
  {
    "label": "CR-6",
    "description": "Clerical and Regulatory",
    "min": "56214",
    "median": "58425.5",
    "max": "60637"
  },
  {
    "label": "CR-7",
    "description": "Clerical and Regulatory",
    "min": "62354",
    "median": "64952",
    "max": "67550"
  },
  {
    "label": "CS-1",
    "description": "Computer Systems",
    "min": "53611",
    "median": "61349.5",
    "max": "69088"
  },
  {
    "label": "CS-2",
    "description": "Computer Systems",
    "min": "66360",
    "median": "73791",
    "max": "81222"
  },
  {
    "label": "CS-3",
    "description": "Computer Systems",
    "min": "78333",
    "median": "87827.5",
    "max": "97322"
  },
  {
    "label": "CS-4",
    "description": "Computer Systems",
    "min": "89690",
    "median": "100664.5",
    "max": "111639"
  },
  {
    "label": "CS-5",
    "description": "Computer Systems",
    "min": "103267",
    "median": "118919",
    "max": "134571"
  },
  {
    "label": "EC-1",
    "description": "Economics and Social Science Services",
    "min": "48355",
    "median": "52284.5",
    "max": "56214"
  },
  {
    "label": "EC-2",
    "description": "Economics and Social Science Services",
    "min": "54101",
    "median": "58063.5",
    "max": "62026"
  },
  {
    "label": "EC-3",
    "description": "Economics and Social Science Services",
    "min": "59756",
    "median": "63685",
    "max": "67614"
  },
  {
    "label": "EC-4",
    "description": "Economics and Social Science Services",
    "min": "64505",
    "median": "69576",
    "max": "74647"
  },
  {
    "label": "EC-5",
    "description": "Economics and Social Science Services",
    "min": "77118",
    "median": "82941",
    "max": "88764"
  },
  {
    "label": "EC-6",
    "description": "Economics and Social Science Services",
    "min": "87128",
    "median": "94088",
    "max": "101048"
  },
  {
    "label": "EC-7",
    "description": "Economics and Social Science Services",
    "min": "98444",
    "median": "105730",
    "max": "113016"
  },
  {
    "label": "EC-8",
    "description": "Economics and Social Science Services",
    "min": "107030",
    "median": "114680.5",
    "max": "122331"
  },
  {
    "label": "FI-1 ",
    "description": "Financial Management",
    "min": "51528",
    "median": "61905",
    "max": "72282"
  },
  {
    "label": "FI-2 ",
    "description": "Financial Management",
    "min": "62721",
    "median": "73903",
    "max": "85085"
  },
  {
    "label": "FI-3 ",
    "description": "Financial Management",
    "min": "80186",
    "median": "91759.5",
    "max": "103333"
  },
  {
    "label": "FI-4 ",
    "description": "Financial Management",
    "min": "90389",
    "median": "103550.5",
    "max": "116712"
  },
  {
    "label": "GT-1",
    "description": "General Technical",
    "min": "40989",
    "median": "43565",
    "max": "46141"
  },
  {
    "label": "GT-2",
    "description": "General Technical",
    "min": "47005",
    "median": "50069",
    "max": "53133"
  },
  {
    "label": "GT-3",
    "description": "General Technical",
    "min": "52567",
    "median": "56086",
    "max": "59605"
  },
  {
    "label": "GT-4",
    "description": "General Technical",
    "min": "59227",
    "median": "63283.5",
    "max": "67340"
  },
  {
    "label": "GT-5",
    "description": "General Technical",
    "min": "66477",
    "median": "71030.5",
    "max": "75584"
  },
  {
    "label": "GT-6",
    "description": "General Technical",
    "min": "73566",
    "median": "78796",
    "max": "84026"
  },
  {
    "label": "GT-7",
    "description": "General Technical",
    "min": "84305",
    "median": "90341",
    "max": "96377"
  },
  {
    "label": "GT-8",
    "description": "General Technical",
    "min": "95636",
    "median": "102261",
    "max": "108886"
  },
  {
    "label": "HR-1",
    "description": "Historical Research",
    "min": "54167",
    "median": "58219.5",
    "max": "62272"
  },
  {
    "label": "HR-2",
    "description": "Historical Research",
    "min": "62832",
    "median": "66163",
    "max": "69494"
  },
  {
    "label": "HR-3",
    "description": "Historical Research",
    "min": "71886",
    "median": "75730.5",
    "max": "79575"
  },
  {
    "label": "HR-4",
    "description": "Historical Research",
    "min": "83567",
    "median": "88214.5",
    "max": "92862"
  },
  {
    "label": "HR-5",
    "description": "Historical Research",
    "min": "90220",
    "median": "97181.5",
    "max": "104143"
  },
  {
    "label": "IS-1 ",
    "description": "Information Services",
    "min": "48796",
    "median": "51685.5",
    "max": "54575"
  },
  {
    "label": "IS-2 ",
    "description": "Information Services",
    "min": "54374",
    "median": "56480",
    "max": "58586"
  },
  {
    "label": "IS-3 ",
    "description": "Information Services",
    "min": "63663",
    "median": "66228",
    "max": "68793"
  },
  {
    "label": "IS-4 ",
    "description": "Information Services",
    "min": "76002",
    "median": "79086.5",
    "max": "82171"
  },
  {
    "label": "IS-5 ",
    "description": "Information Services",
    "min": "84658",
    "median": "87993",
    "max": "91328"
  },
  {
    "label": "IS-6 ",
    "description": "Information Services",
    "min": "89112",
    "median": "95502",
    "max": "101892"
  },
  {
    "label": "LA-0",
    "description": "Law",
    "min": "36172",
    "median": "57571",
    "max": "78970"
  },
  {
    "label": "LA-1",
    "description": "Law",
    "min": "71734",
    "median": "85335",
    "max": "98936"
  },
  {
    "label": "LA-2",
    "description": "Law",
    "min": "99976",
    "median": "118931",
    "max": "137886"
  },
  {
    "label": "LA-3",
    "description": "Law",
    "min": "121156",
    "median": "136794.5",
    "max": "152433"
  },
  {
    "label": "LA-4",
    "description": "Law",
    "min": "136332",
    "median": "154754.5",
    "max": "173177"
  },
  {
    "label": "LA-5",
    "description": "Law",
    "min": "158057",
    "median": "175717",
    "max": "193377"
  },
  {
    "label": "MA-1",
    "description": "Mathematics",
    "min": "30451",
    "median": "41342",
    "max": "52233"
  },
  {
    "label": "MA-2",
    "description": "Mathematics",
    "min": "53468",
    "median": "57684",
    "max": "61900"
  },
  {
    "label": "MA-3",
    "description": "Mathematics",
    "min": "65093",
    "median": "69611",
    "max": "74129"
  },
  {
    "label": "MA-4",
    "description": "Mathematics",
    "min": "77726",
    "median": "82678",
    "max": "87630"
  },
  {
    "label": "MA-5",
    "description": "Mathematics",
    "min": "91058",
    "median": "95503",
    "max": "99948"
  },
  {
    "label": "MA-6",
    "description": "Mathematics",
    "min": "101438",
    "median": "106072.5",
    "max": "110707"
  },
  {
    "label": "MA-7",
    "description": "Mathematics",
    "min": "111071",
    "median": "115615",
    "max": "120159"
  },
  {
    "label": "PE-1",
    "description": "Personnel Administration",
    "min": "49670",
    "median": "55729",
    "max": "61788"
  },
  {
    "label": "PE-2",
    "description": "Personnel Administration",
    "min": "62657",
    "median": "66101",
    "max": "69545"
  },
  {
    "label": "PE-3",
    "description": "Personnel Administration",
    "min": "70259",
    "median": "74176.5",
    "max": "78094"
  },
  {
    "label": "PE-4",
    "description": "Personnel Administration",
    "min": "78114",
    "median": "82469",
    "max": "86824"
  },
  {
    "label": "PE-5",
    "description": "Personnel Administration",
    "min": "87468",
    "median": "92463",
    "max": "97458"
  },
  {
    "label": "PE-6",
    "description": "Personnel Administration",
    "min": "92755",
    "median": "100427",
    "max": "108099"
  },
  {
    "label": "PG-1",
    "description": "Purchasing and Supply",
    "min": "41366",
    "median": "47422.5",
    "max": "53479"
  },
  {
    "label": "PG-2",
    "description": "Purchasing and Supply",
    "min": "53998",
    "median": "57444",
    "max": "60890"
  },
  {
    "label": "PG-3",
    "description": "Purchasing and Supply",
    "min": "60117",
    "median": "63959",
    "max": "67801"
  },
  {
    "label": "PG-4",
    "description": "Purchasing and Supply",
    "min": "71317",
    "median": "75902.5",
    "max": "80488"
  },
  {
    "label": "PG-5",
    "description": "Purchasing and Supply",
    "min": "83948",
    "median": "89124",
    "max": "94300"
  },
  {
    "label": "PG-6",
    "description": "Purchasing and Supply",
    "min": "92468",
    "median": "97588.5",
    "max": "102709"
  },
  {
    "label": "PM-1 ",
    "description": "Programme Administration",
    "min": "48796",
    "median": "51685.5",
    "max": "54575"
  },
  {
    "label": "PM-2 ",
    "description": "Programme Administration",
    "min": "54374",
    "median": "56480",
    "max": "58586"
  },
  {
    "label": "PM-3 ",
    "description": "Programme Administration",
    "min": "58281",
    "median": "60537.5",
    "max": "62794"
  },
  {
    "label": "PM-4 ",
    "description": "Programme Administration",
    "min": "63663",
    "median": "66228",
    "max": "68793"
  },
  {
    "label": "PM-5 ",
    "description": "Programme Administration",
    "min": "76002",
    "median": "79086.5",
    "max": "82171"
  },
  {
    "label": "PM-6 ",
    "description": "Programme Administration",
    "min": "89112",
    "median": "95502",
    "max": "101892"
  },
  {
    "label": "PM-7 ",
    "description": "Programme Administration",
    "min": "92014",
    "median": "100159.5",
    "max": "108305"
  },
  {
    "label": "EX-01",
    "description": "Executive",
    "min": "125700",
    "median": "125700",
    "max": "125700"
  },
  {
    "label": "EX-02",
    "description": "Executive",
    "min": "140700",
    "median": "140700",
    "max": "140700"
  },
  {
    "label": "EX-03",
    "description": "Executive",
    "min": "157500",
    "median": "157500",
    "max": "157500"
  },
  {
    "label": "EX-04",
    "description": "Executive",
    "min": "180600",
    "median": "180600",
    "max": "180600"
  },
  {
    "label": "EX-05",
    "description": "Executive",
    "min": "202500",
    "median": "202500",
    "max": "202500"
  }
]

;
