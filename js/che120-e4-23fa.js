
// import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// import { QuestionLimF, MCQ, MCQMulti, QuestionF} from './QuestionLim.js';

const { PDFDocument } = PDFLib

const data = [
    {
        "Student Name": "Clarissa Rose Feitl",
        "Student ID": "1055448",
        "Class Level": "Sophomore",
        "Email": "feitlcr2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "1",
        "Vial": "1",
        "U1": "11",
        "U2": "9"
    },
    {
        "Student Name": "Matthew Fleming",
        "Student ID": "1058234",
        "Class Level": "First Year",
        "Email": "fleminma2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "2",
        "Vial": "2",
        "U1": "8",
        "U2": "7"
    },
    {
        "Student Name": "Liam Christopher Fluharty",
        "Student ID": "1055766",
        "Class Level": "First Year",
        "Email": "fluharlc2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "3",
        "Vial": "3",
        "U1": "6",
        "U2": "7"
    },
    {
        "Student Name": "Wyatt Heath Freeman",
        "Student ID": "1055616",
        "Class Level": "First Year",
        "Email": "freemawh2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "4",
        "Vial": "4",
        "U1": "8",
        "U2": "14"
    },
    {
        "Student Name": "Zach Heckendorn",
        "Student ID": "1055562",
        "Class Level": "First Year",
        "Email": "heckenza2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "5",
        "Vial": "5",
        "U1": "7",
        "U2": "9"
    },
    {
        "Student Name": "Jordin Mekenzi Kauffman",
        "Student ID": "1056272",
        "Class Level": "First Year",
        "Email": "kauffmjm2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "6",
        "Vial": "6",
        "U1": "14",
        "U2": "11"
    },
    {
        "Student Name": "Alaina Nicole Krajewski",
        "Student ID": "1058262",
        "Class Level": "First Year",
        "Email": "krajewan2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "7",
        "Vial": "7",
        "U1": "4",
        "U2": "10"
    },
    {
        "Student Name": "Michael T. Lally",
        "Student ID": "1055443",
        "Class Level": "First Year",
        "Email": "lallymt2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "8",
        "Vial": "8",
        "U1": "6",
        "U2": "14"
    },
    {
        "Student Name": "Nico Centori Maffei",
        "Student ID": "1052946",
        "Class Level": "Sophomore",
        "Email": "maffeinc2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "9",
        "Vial": "9",
        "U1": "11",
        "U2": "12"
    },
    {
        "Student Name": "Matt William Michalko",
        "Student ID": "1051187",
        "Class Level": "First Year",
        "Email": "michalmw2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "10",
        "Vial": "10",
        "U1": "1",
        "U2": "5"
    },
    {
        "Student Name": "Nash Michael Minor",
        "Student ID": "1054358",
        "Class Level": "First Year",
        "Email": "minornm2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "11",
        "Vial": "11",
        "U1": "6",
        "U2": "13"
    },
    {
        "Student Name": "Marco Palaganas",
        "Student ID": "1053130",
        "Class Level": "Sophomore",
        "Email": "palagarm2021@mountunion.edu",
        "Section": "1",
        "VialUnknown": "12",
        "Vial": "12",
        "U1": "6",
        "U2": "5"
    },
    {
        "Student Name": "Mason R. Palmer",
        "Student ID": "1058248",
        "Class Level": "First Year",
        "Email": "palmermr2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "13",
        "Vial": "13",
        "U1": "14",
        "U2": "8"
    },
    {
        "Student Name": "Savanna Leone Richards",
        "Student ID": "1057964",
        "Class Level": "First Year",
        "Email": "richarsl2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "14",
        "Vial": "14",
        "U1": "12",
        "U2": "4"
    },
    {
        "Student Name": "Luke M. Simons",
        "Student ID": "1056338",
        "Class Level": "First Year",
        "Email": "simonslm2022@mountunion.edu",
        "Section": "1",
        "VialUnknown": "1",
        "Vial": "15",
        "U1": "3",
        "U2": "2"
    },
    {
        "Student Name": "Isaac Robert Sommers",
        "Student ID": "1061613",
        "Class Level": "First Year",
        "Email": "sommerir2023@mountunion.edu",
        "Section": "1",
        "VialUnknown": "2",
        "Vial": "16",
        "U1": "12",
        "U2": "4"
    },
    {
        "Student Name": "Connor Nicholas Capel",
        "Student ID": "1055418",
        "Class Level": "First Year",
        "Email": "capelcn2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "3",
        "Vial": "17",
        "U1": "14",
        "U2": "12"
    },
    {
        "Student Name": "Alexis Sheila Caugherty",
        "Student ID": "1050300",
        "Class Level": "Sophomore",
        "Email": "caugheas2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "4",
        "Vial": "18",
        "U1": "7",
        "U2": "13"
    },
    {
        "Student Name": "Ty Echeverry",
        "Student ID": "1050129",
        "Class Level": "Sophomore",
        "Email": "echevety2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "5",
        "Vial": "19",
        "U1": "1",
        "U2": "4"
    },
    {
        "Student Name": "Brady Joseph Hansen",
        "Student ID": "1052746",
        "Class Level": "Sophomore",
        "Email": "hansenbj2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "6",
        "Vial": "20",
        "U1": "5",
        "U2": "12"
    },
    {
        "Student Name": "Schuyler Beth Hollenbach",
        "Student ID": "1052202",
        "Class Level": "Junior",
        "Email": "hollensb2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "7",
        "Vial": "21",
        "U1": "12",
        "U2": "4"
    },
    {
        "Student Name": "Marcus Lyndon Jackson",
        "Student ID": "1052823",
        "Class Level": "Sophomore",
        "Email": "jacksoml2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "8",
        "Vial": "22",
        "U1": "6",
        "U2": "12"
    },
    {
        "Student Name": "Kaily M. Jurcak",
        "Student ID": "1049928",
        "Class Level": "Sophomore",
        "Email": "jurcakkm2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "9",
        "Vial": "23",
        "U1": "2",
        "U2": "4"
    },
    {
        "Student Name": "Emily Grace Krizner",
        "Student ID": "1055600",
        "Class Level": "Sophomore",
        "Email": "krizneeg2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "10",
        "Vial": "24",
        "U1": "6",
        "U2": "3"
    },
    {
        "Student Name": "Ryan Jeffrey Matyas",
        "Student ID": "1050941",
        "Class Level": "Junior",
        "Email": "matyasrj2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "11",
        "Vial": "25",
        "U1": "2",
        "U2": "6"
    },
    {
        "Student Name": "Braden R. Mocella",
        "Student ID": "1057997",
        "Class Level": "First Year",
        "Email": "mocellbr2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "12",
        "Vial": "26",
        "U1": "10",
        "U2": "4"
    },
    {
        "Student Name": "Samuel Duncan Montgomery",
        "Student ID": "795653",
        "Class Level": "Junior",
        "Email": "montgosd2024@mountunion.edu",
        "Section": "2",
        "VialUnknown": "13",
        "Vial": "27",
        "U1": "11",
        "U2": "7"
    },
    {
        "Student Name": "Reese P. Osborn",
        "Student ID": "1055441",
        "Class Level": "First Year",
        "Email": "osbornrp2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "14",
        "Vial": "28",
        "U1": "7",
        "U2": "1"
    },
    {
        "Student Name": "Sierra G. Schlosser",
        "Student ID": "1055581",
        "Class Level": "First Year",
        "Email": "schlossg2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "1",
        "Vial": "29",
        "U1": "9",
        "U2": "12"
    },
    {
        "Student Name": "Morgan Elizabeth Short",
        "Student ID": "1057272",
        "Class Level": "First Year",
        "Email": "shortme2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "2",
        "Vial": "30",
        "U1": "7",
        "U2": "12"
    },
    {
        "Student Name": "Bailey Elizabeth Shutsa",
        "Student ID": "1055407",
        "Class Level": "First Year",
        "Email": "shutsabe2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "3",
        "Vial": "31",
        "U1": "13",
        "U2": "5"
    },
    {
        "Student Name": "Erilynn Marielle Stevens",
        "Student ID": "787893",
        "Class Level": "Senior",
        "Email": "stevenem2022@mountunion.edu",
        "Section": "2",
        "VialUnknown": "4",
        "Vial": "32",
        "U1": "5",
        "U2": "6"
    },
    {
        "Student Name": "Mason J. Wilkson",
        "Student ID": "1049826",
        "Class Level": "Sophomore",
        "Email": "wilksomj2021@mountunion.edu",
        "Section": "2",
        "VialUnknown": "5",
        "Vial": "33",
        "U1": "9",
        "U2": "10"
    },
    {
        "Student Name": "Anthony Robert Andreski",
        "Student ID": "795229",
        "Class Level": "Junior",
        "Email": "andresar2024@mountunion.edu",
        "Section": "4",
        "VialUnknown": "6",
        "Vial": "34",
        "U1": "1",
        "U2": "7"
    },
    {
        "Student Name": "Casey Jade Kildow",
        "Student ID": "1052335",
        "Class Level": "Sophomore",
        "Email": "kildowcj2021@mountunion.edu",
        "Section": "4",
        "VialUnknown": "7",
        "Vial": "35",
        "U1": "10",
        "U2": "2"
    },
    {
        "Student Name": "Dj McDonald",
        "Student ID": "1057751",
        "Class Level": "First Year",
        "Email": "mcdonado2022@mountunion.edu",
        "Section": "4",
        "VialUnknown": "8",
        "Vial": "36",
        "U1": "7",
        "U2": "6"
    },
    {
        "Student Name": "Ayden J. Payne",
        "Student ID": "1056657",
        "Class Level": "Sophomore",
        "Email": "payneaj2022@mountunion.edu",
        "Section": "4",
        "VialUnknown": "9",
        "Vial": "37",
        "U1": "7",
        "U2": "11"
    },
    {
        "Student Name": "Emily Ruth Peel",
        "Student ID": "1056012",
        "Class Level": "First Year",
        "Email": "peeler2022@mountunion.edu",
        "Section": "4",
        "VialUnknown": "10",
        "Vial": "38",
        "U1": "4",
        "U2": "14"
    },
    {
        "Student Name": "Rodolfo Simon Porlles Lopez",
        "Student ID": "1052105",
        "Class Level": "Sophomore",
        "Email": "porllers2021@mountunion.edu",
        "Section": "4",
        "VialUnknown": "11",
        "Vial": "39",
        "U1": "4",
        "U2": "12"
    },
    {
        "Student Name": "Dom Tunno",
        "Student ID": "1056086",
        "Class Level": "First Year",
        "Email": "tunnodo2022@mountunion.edu",
        "Section": "4",
        "VialUnknown": "12",
        "Vial": "40",
        "U1": "1",
        "U2": "5"
    },
    {
        "Student Name": "Steven Matthew Wright",
        "Student ID": "1057944",
        "Class Level": "First Year",
        "Email": "wrightsm2022@mountunion.edu",
        "Section": "4",
        "VialUnknown": "13",
        "Vial": "41",
        "U1": "12",
        "U2": "8"
    },
    {
        "Student Name": "Kody James Arntz",
        "Student ID": "1055958",
        "Class Level": "First Year",
        "Email": "arntzkj2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "14",
        "Vial": "42",
        "U1": "4",
        "U2": "6"
    },
    {
        "Student Name": "Camden Joseph Cantrell",
        "Student ID": "1058200",
        "Class Level": "First Year",
        "Email": "cantrecj2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "1",
        "Vial": "43",
        "U1": "11",
        "U2": "5"
    },
    {
        "Student Name": "Thomas David Cassetty",
        "Student ID": "1056307",
        "Class Level": "First Year",
        "Email": "cassettd2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "2",
        "Vial": "44",
        "U1": "4",
        "U2": "12"
    },
    {
        "Student Name": "Dante Collier",
        "Student ID": "1057651",
        "Class Level": "First Year",
        "Email": "collieda2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "3",
        "Vial": "45",
        "U1": "2",
        "U2": "13"
    },
    {
        "Student Name": "Jack Clifford Davis",
        "Student ID": "1050615",
        "Class Level": "Sophomore",
        "Email": "davisjc2021@mountunion.edu",
        "Section": "5",
        "VialUnknown": "4",
        "Vial": "46",
        "U1": "2",
        "U2": "7"
    },
    {
        "Student Name": "Nicholas W. Deack",
        "Student ID": "790878",
        "Class Level": "Junior",
        "Email": "deackn2023@mountunion.edu",
        "Section": "5",
        "VialUnknown": "5",
        "Vial": "47",
        "U1": "1",
        "U2": "4"
    },
    {
        "Student Name": "Elijah Ross Fernstrum",
        "Student ID": "1056641",
        "Class Level": "First Year",
        "Email": "fernster2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "6",
        "Vial": "48",
        "U1": "3",
        "U2": "4"
    },
    {
        "Student Name": "Elizabeth Higginbotham",
        "Student ID": "1055474",
        "Class Level": "First Year",
        "Email": "higginel2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "7",
        "Vial": "49",
        "U1": "8",
        "U2": "4"
    },
    {
        "Student Name": "Steven Wayne Marra",
        "Student ID": "1056624",
        "Class Level": "First Year",
        "Email": "marrasw2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "8",
        "Vial": "50",
        "U1": "13",
        "U2": "14"
    },
    {
        "Student Name": "Elizabeth Ames Mason",
        "Student ID": "1058778",
        "Class Level": "First Year",
        "Email": "masonea2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "9",
        "Vial": "51",
        "U1": "8",
        "U2": "6"
    },
    {
        "Student Name": "Gavin Joseph Paul Peppel",
        "Student ID": "1060885",
        "Class Level": "First Year",
        "Email": "peppelgj2023@mountunion.edu",
        "Section": "5",
        "VialUnknown": "10",
        "Vial": "52",
        "U1": "12",
        "U2": "2"
    },
    {
        "Student Name": "Lukea Mei Pitinii",
        "Student ID": "1055843",
        "Class Level": "First Year",
        "Email": "pitinilm2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "11",
        "Vial": "53",
        "U1": "6",
        "U2": "14"
    },
    {
        "Student Name": "Campbell Patrick Ray",
        "Student ID": "1056518",
        "Class Level": "First Year",
        "Email": "raycp2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "12",
        "Vial": "54",
        "U1": "6",
        "U2": "3"
    },
    {
        "Student Name": "Halle Marie Sell",
        "Student ID": "1057189",
        "Class Level": "First Year",
        "Email": "sellhm2022@mountunion.edu",
        "Section": "5",
        "VialUnknown": "13",
        "Vial": "55",
        "U1": "12",
        "U2": "1"
    },
    {
        "Student Name": "Tyler Stack",
        "Student ID": "795569",
        "Class Level": "Sophomore",
        "Email": "stackt2024@mountunion.edu",
        "Section": "5",
        "VialUnknown": "14",
        "Vial": "56",
        "U1": "13",
        "U2": "4"
    },
    {
        "Student Name": "Victoria O. Atkinson",
        "Student ID": "791299",
        "Class Level": "Senior",
        "Email": "atkinsvo2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "1",
        "Vial": "57",
        "U1": "7",
        "U2": "14"
    },
    {
        "Student Name": "Jonah Christopher Bacho",
        "Student ID": "1050524",
        "Class Level": "Sophomore",
        "Email": "bachojc2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "2",
        "Vial": "58",
        "U1": "10",
        "U2": "11"
    },
    {
        "Student Name": "Danielle Andraya Bisesi",
        "Student ID": "1050620",
        "Class Level": "Sophomore",
        "Email": "bisesida2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "3",
        "Vial": "59",
        "U1": "7",
        "U2": "6"
    },
    {
        "Student Name": "Taylor Marie Cox",
        "Student ID": "1053446",
        "Class Level": "Sophomore",
        "Email": "coxtm2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "4",
        "Vial": "60",
        "U1": "14",
        "U2": "2"
    },
    {
        "Student Name": "Manny Emanuel Curtis",
        "Student ID": "1051375",
        "Class Level": "Sophomore",
        "Email": "curtisme2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "5",
        "Vial": "61",
        "U1": "14",
        "U2": "10"
    },
    {
        "Student Name": "Grant Dunmire",
        "Student ID": "1051184",
        "Class Level": "Sophomore",
        "Email": "dunmirgr2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "6",
        "Vial": "62",
        "U1": "8",
        "U2": "4"
    },
    {
        "Student Name": "Fred Fevrier",
        "Student ID": "1058555",
        "Class Level": "First Year",
        "Email": "fevriefr2022@mountunion.edu",
        "Section": "6",
        "VialUnknown": "7",
        "Vial": "63",
        "U1": "1",
        "U2": "13"
    },
    {
        "Student Name": "Hethon Antione Foster",
        "Student ID": "1054933",
        "Class Level": "First Year",
        "Email": "fosterha2022@mountunion.edu",
        "Section": "6",
        "VialUnknown": "8",
        "Vial": "64",
        "U1": "6",
        "U2": "4"
    },
    {
        "Student Name": "Robert Reagan Gavlik",
        "Student ID": "1055175",
        "Class Level": "First Year",
        "Email": "gavlikrr2022@mountunion.edu",
        "Section": "6",
        "VialUnknown": "9",
        "Vial": "65",
        "U1": "5",
        "U2": "8"
    },
    {
        "Student Name": "Johnny Richard Geiger",
        "Student ID": "1052220",
        "Class Level": "Sophomore",
        "Email": "geigerjo2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "10",
        "Vial": "66",
        "U1": "2",
        "U2": "14"
    },
    {
        "Student Name": "Noah Andrew Koknat",
        "Student ID": "1055649",
        "Class Level": "First Year",
        "Email": "koknatna2022@mountunion.edu",
        "Section": "6",
        "VialUnknown": "11",
        "Vial": "67",
        "U1": "13",
        "U2": "6"
    },
    {
        "Student Name": "Jake Charles Miller",
        "Student ID": "1049848",
        "Class Level": "Sophomore",
        "Email": "millerjc2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "12",
        "Vial": "68",
        "U1": "14",
        "U2": "9"
    },
    {
        "Student Name": "Cory A. Miner",
        "Student ID": "1054807",
        "Class Level": "First Year",
        "Email": "minerco2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "13",
        "Vial": "69",
        "U1": "6",
        "U2": "5"
    },
    {
        "Student Name": "Jillian Alanna Rymer",
        "Student ID": "1057350",
        "Class Level": "First Year",
        "Email": "rymerja2022@mountunion.edu",
        "Section": "6",
        "VialUnknown": "14",
        "Vial": "70",
        "U1": "11",
        "U2": "13"
    },
    {
        "Student Name": "Josh J. Stafford",
        "Student ID": "1050291",
        "Class Level": "First Year",
        "Email": "staffojj2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "1",
        "Vial": "71",
        "U1": "3",
        "U2": "5"
    },
    {
        "Student Name": "Sage Claire Warner",
        "Student ID": "1052628",
        "Class Level": "Sophomore",
        "Email": "warnerac2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "2",
        "Vial": "72",
        "U1": "6",
        "U2": "11"
    },
    {
        "Student Name": "Nick Cole Wong",
        "Student ID": "1051445",
        "Class Level": "Sophomore",
        "Email": "wongnc2021@mountunion.edu",
        "Section": "6",
        "VialUnknown": "3",
        "Vial": "73",
        "U1": "10",
        "U2": "11"
    },
    {
        "Student Name": "Ryan Dwyer",
        "Student ID": "999999",
        "Class Level": "First Year",
        "Email": "dwyerry@mountunion.edu",
        "Section": "7",
        "VialUnknown": "4",
        "Vial": "74",
        "U1": "6",
        "U2": "5"
    },
    {
        "Student Name": "Laura Dwyer",
        "Student ID": "999998",
        "Class Level": "First Year",
        "Email": "dwyerle@mountunion.edu",
        "Section": "7",
        "VialUnknown": "5",
        "Vial": "75",
        "U1": "11",
        "U2": "10"
    }
];

function assignSampleId(jsonData, myEmail) {

    // Needs to be in submission order (not reverse chronological...)
    jsonData.reverse();
    const formsMapped = jsonData.filter(x => x.data.sectionInput === mySection);
    const formEmails = formsMapped.map(x => x.data.emailInput);

    const formsUnique = Object.fromEntries(formsMapped.filter( (x, i) => formEmails.indexOf(x.data.emailInput) === i)
                                        .map( (x, i) => [x.data.emailInput, {sample: i+1 + (parseInt(mySection)-1)*18, time: x.created_at}]))

    return formsUnique[myEmail]
} 

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("120-water-23sp");
    let formData = new FormData(myForm);
    const mySection = formData.get('sectionInput')
    const myEmail = formData.get('emailInput');
    const matchedObject = data.filter(x => x.Email === myEmail);
    let obj;
    if (matchedObject.length === 0) {
        document.getElementById("email-not-found").style.display = "block";
        return;
    } else {
        document.getElementById("email-not-found").style.display = "none";
        obj = matchedObject[0];
    }
    chooseUnknowns(obj);
}

document
  .getElementById("120-water-23sp")
  .addEventListener("submit", handleSubmit);



function checkReady() {
    let ready = true;
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;

    if (name == "" || email == "") {
        ready = false;
    }
    if (ready) {
        document.getElementById("submitName").removeAttribute("disabled");
    }
}

window.checkReady = checkReady;

function mod(n, m) {
    return ((n % m) + m) % m;
  }
  
  function stringToHash(string) { 
                    
                  var hash = 0; 
                    
                  if (string.length == 0) return hash; 
                    
                  for (i = 0; i < string.length; i++) { 
                      char = string.charCodeAt(i); 
                      hash = ((hash << 5) - hash) + char; 
                      hash = hash & hash; 
                  } 
                    
                  return hash; 
              } 
  

function show(element) {
	const el  = document.getElementById(element);
	el.removeAttribute("hidden");
}

window.show = show

function hide(element) {
	const el  = document.getElementById(element);
	el.setAttribute("hidden", true);
}

window.hide = hide


/**
* range Get an array of numbers within a range
* @param min {number} Lowest number in array
* @param max {number} Highest number in array
* @param rand {bool} Shuffle array
* @return {array}
*/
function range( min, max, rng ) {
    var arr = ( new Array( ++max - min ) )
      .join('.').split('.')
      .map(function( v,i ){ return min + i });
    return arr.map(function( v ) { return [ rng(), v ] })
         .sort().map(function( v ) { return v[ 1 ] });
}

let unknownLetters = ["A", "B", "C"];

function chooseUnknowns(obj) {
    const unknowns = "ABCDEFGHIJKLMN".split("");
    const unknownsVal = Object.fromEntries(unknowns.map((x,i) => [x, i+1]));

    const unknownsNumbered = Object.fromEntries(unknowns.map((x, i) => [i+1, x]));

    const rng = new Math.seedrandom(obj.Email+'2023'+'spring-CHE120');


    const myUnknowns = [obj.U1, obj.U2, obj.Vial];
    unknownLetters[0] = unknownsNumbered[myUnknowns[0]];
    unknownLetters[1] = unknownsNumbered[myUnknowns[1]];

    document.getElementById('assignedUnknowns').style.display='block';
    
    const sampleIDs = myUnknowns.slice(0,-1).map( x => Math.floor(rng()*10000))
                                .sort()
                                .map(x=>x.toString().padStart(4, "0"));

    const unknownIDs = myUnknowns.slice(0,-1).map((x,i)=>{
        const num = parseInt(x);
        const s = sampleIDs[i];
        if (num < 10) {
            let initial_id = s.slice(0, 3) + num.toString() + s.slice(3);
            if (initial_id[1] == "1") {
                let new_char_1 = ((Math.floor(rng()*9)+2) % 10).toString();
                let index = 1;
                initial_id = initial_id.substring(0, index) + new_char_1 + initial_id.substring(index + 1);
            }
            return initial_id
        }
        else {
            return s[0] + "1" + s[2] + num.toString()[1] + s.slice(3);
        }
    });
    unknownIDs[2] = obj.Vial;
    const numbers = ['1', '2', '3'];
    numbers.forEach( (x, i) => {
        document.getElementById(`unknown`+x).innerText = unknownIDs[i];
    });
}

window.chooseUnknowns = chooseUnknowns;


async function copyPages() {
        // Fetch first existing PDF document

    const name = document.getElementById("nameInput").value;

    const baseUrl = '/pdf/'
    const fileName = (x) => baseUrl+x+'.pdf.pdf';
    const pdf1 =  await fetch(fileName(unknownLetters[0])).then(res => res.arrayBuffer());
    const pdf2 =  await fetch(fileName(unknownLetters[1])).then(res => res.arrayBuffer());



    const pdfDoc1 = await PDFDocument.load(pdf1);
    const pdfDoc2 = await PDFDocument.load(pdf2);
    // const pdfDoc3 = await PDFDocument.load(pdf3);


    
    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Copy the 1st page from the first donor document, and 
    // the 743rd page from the second donor document
    const [p11, p12] = await pdfDoc.copyPages(pdfDoc1, [0, 1])
    const [p21, p22] = await pdfDoc.copyPages(pdfDoc2, [0, 1])
    // const [p31, p32] = await pdfDoc.copyPages(pdfDoc3, [0, 1])

    // Add the first copied page
    pdfDoc.addPage(p11);
    pdfDoc.addPage(p12);
    pdfDoc.addPage(p21);
    pdfDoc.addPage(p22);
    // pdfDoc.addPage(p31);
    // pdfDoc.addPage(p32);
    
    const pages = pdfDoc.getPages()

    const unknowns = ['1', '2', '3'].map(x=>document.getElementById(`unknown`+x).innerText)

    const inds = [0, 1];
    inds.forEach(i=>{
        if (i ===0 ) {
            pages[i*2].drawText(`2023 ${name} ${unknowns[i]} IR. In lab: measure vial ${unknowns[2]}`);
        } else {
            pages[i*2].drawText(`${name} ${unknowns[i]} IR`);
        }
        pages[i*2+1].drawText(`${name} ${unknowns[i]} NMR`);
    });

    pages[0].moveDown(18)
    pages[0].drawText(``);

    
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    
    // Trigger the browser to download the PDF document
    download(pdfBytes, `CHE 120 ${name} E1 Spectra.pdf`, "application/pdf");
}

window.copyPages = copyPages