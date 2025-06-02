document.addEventListener("DOMContentLoaded", function () {
    var map = L.map(document.querySelector(".map")).setView([23.8103, 90.4125], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = [
        // রাজশাহী বিভাগ
        { lat: 24.3745, lng: 88.6042, loc: "Rajshahi (রাজশাহী)", number: "01769112386, 01769112388" },
        { lat: 24.5965, lng: 88.2776, loc: "Chapai Nawabganj (চাঁপাইনবাবগঞ্জ)", number: "01769112070, 01769112372" },
        { lat: 24.0064, lng: 89.2372, loc: "Pabna (পাবনা)", number: "01769122478, 01769112480" },
        { lat: 24.4534, lng: 89.7007, loc: "Sirajganj (সিরাজগঞ্জ)", number: "01769122462, 01769122264" },
        { lat: 24.4206, lng: 88.9861, loc: "Natore (নাটোর)", number: "01769112446, 01769112448" },
        { lat: 24.7936, lng: 88.9318, loc: "Naogaon (নওগাঁ)", number: "01769122115, 01769122108" },
        { lat: 25.0947, lng: 89.0227, loc: "Joypurhat (জয়পুরহাট)", number: "01769112634" },
        { lat: 24.8465, lng: 89.3776, loc: "Bogra (বগুড়া)", number: "01769112594, 01769112170" },

        // বরিশাল বিভাগ
        { lat: 22.7010, lng: 90.3535, loc: "Barishal (বরিশাল)", number: "01769072556, 01769072456" },
        { lat: 22.3596, lng: 90.3296, loc: "Patuakhali (পটুয়াখালী)", number: "01769073120, 01769073122" },
        { lat: 22.6406, lng: 90.1987, loc: "Jhalokathi (ঝালকাঠি)", number: "01769072108, 01769072122" },
        { lat: 22.5790, lng: 89.9720, loc: "Pirojpur (পিরোজপুর)", number: "01769078298, 01769078308" },

        // চট্টগ্রাম বিভাগ
        { lat: 22.8240, lng: 91.0967, loc: "Noakhali (নোয়াখালী)", number: "01644466051, 01725038677" },
        { lat: 23.2333, lng: 90.6719, loc: "Chandpur (চাঁদপুর)", number: "01815440543, 01568734976" },
        { lat: 23.0231, lng: 91.3966, loc: "Feni (ফেনী)", number: "01769335461, 01769335434" },
        { lat: 22.9445, lng: 90.8412, loc: "Lakshmipur (লক্ষ্মীপুর)", number: "01721821096, 01708762110" },
        { lat: 23.4607, lng: 91.1809, loc: "Cumilla (কুমিল্লা)", number: "01334616159, 01334616160" },
        { lat: 23.9571, lng: 91.1116, loc: "Brahmanbaria (ব্রাহ্মণবাড়িয়া)", number: "01769322491, 01769332609" },
        { lat: 21.4272, lng: 92.0058, loc: "Cox's Bazar and Chattogram's Lohagara, Patiya, Chandanaish, Banshkhali, Satkania (কক্সবাজার এবং চট্টগ্রামের লোহাগাড়া, পটিয়া, চন্দনাইশ, বাঁশখালী, সাতকানিয়া)", number: "01769107231, 01769107232" },
        { lat: 22.3569, lng: 91.7832, loc: "Chattogram (excluding above upazilas) (চট্টগ্রাম)", number: "01769242012, 01769242014" },

        // Dhaka Metropolitan (ঢাকা মহানগর)
        {
            lat: 23.7386, lng: 90.3844,
            loc: "Lalbagh, Dhanmondi, Mohammadpur, Shyamoli, Agargaon, Mohakhali, Tejgaon, Elephant Road, Katabon (লালবাগ, ধানমন্ডি, মোহাম্মদপুর, শ্যামলী, আগারগাঁও, মহাখালী, তেজগাঁও, এলিফ্যান্ট রোড, কাটাবন)",
            number: "01769051838, 01769051839"
        },
        {
            lat: 23.7965, lng: 90.4190,
            loc: "Gulshan, Baridhara, Banani, Bashundhara, Badda, Rampura, Shahjahanpur, Uttarkhan, Dakkhinkhan, Banasree (গুলশান, বারিধারা, বনানী, বসুন্ধরা, বাড্ডা, রামপুরা, শাহজাহানপুর, উত্তরখান, দক্ষিণখান, বনশ্রী)",
            number: "01769013102, 01769053154"
        },
        {
            lat: 23.8241, lng: 90.3654,
            loc: "Mirpur 1 to 14, Khilkhet, Uttara, Hazrat Shahjalal International Airport (মিরপুর ১ থেকে ১৪, খিলক্ষেত, উত্তরা, হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর)",
            number: "01769024210, 01769024211"
        },
        {
            lat: 23.7337, lng: 90.4125,
            loc: "Motijheel, Segunbagicha, Kakrail, Shantinagar, Eskaton, Rajarbagh, Paltan, Gulistan, Old Dhaka (মতিঝিল, সেগুনবাগিচা, কাকরাইল, শান্তিনগর, ইস্কাটন, রাজারবাগ, পল্টন, গুলিস্তান, পুরান ঢাকা)",
            number: "01769092428, 01769095419"
        },

        // ঢাকা বিভাগ (rest)
        { lat: 23.1641, lng: 90.1890, loc: "Madaripur (মাদারীপুর)", number: "01769072102, 01769072103" },
        { lat: 24.4449, lng: 90.7766, loc: "Kishoreganj (কিশোরগঞ্জ)", number: "01769192382, 01769202366" },
        { lat: 24.2513, lng: 89.9167, loc: "Tangail (টাঙ্গাইল)", number: "01769212651, 01769210870" },
        { lat: 23.0056, lng: 89.8266, loc: "Gopalganj (গোপালগঞ্জ)", number: "01769552436, 01769552448" },
        { lat: 23.7573, lng: 89.6440, loc: "Rajbari (রাজবাড়ী)", number: "01769552514, 01769552528" },
        { lat: 23.9999, lng: 90.4203, loc: "Gazipur (গাজীপুর)", number: "01785349842, 01769092106" },
        { lat: 23.5422, lng: 90.5305, loc: "Munshiganj (মুন্সিগঞ্জ)", number: "01769082798, 01769082784" },
        { lat: 23.8615, lng: 89.8777, loc: "Manikganj (মানিকগঞ্জ)", number: "01769092540, 01769092542" },
        { lat: 23.6238, lng: 90.5000, loc: "Narayanganj (নারায়ণগঞ্জ)", number: "01732051858" },
        { lat: 23.9322, lng: 90.7156, loc: "Narsingdi (নরসিংদী)", number: "01769082766, 01769082778" },
        { lat: 23.2423, lng: 90.4348, loc: "Shariatpur (শরীয়তপুর)", number: "01769097660, 01769097655" },
        { lat: 23.6070, lng: 89.8429, loc: "Faridpur (ফরিদপুর)", number: "01769092102, 01742966162" },

        // Sylhet Division (সিলেট বিভাগ)
        { lat: 24.8949, lng: 91.8687, loc: "Sylhet (সিলেট)", number: "01769177268, 01987833301" },
        { lat: 24.3745, lng: 91.4155, loc: "Habiganj (হবিগঞ্জ)", number: "01769172596, 01769172616" },
        { lat: 25.0658, lng: 91.3950, loc: "Sunamganj (সুনামগঞ্জ)", number: "01769172420, 01769172430" },
        { lat: 24.4826, lng: 91.7777, loc: "Moulvibazar (মৌলভীবাজার)", number: "01769175680, 01769172400" },


        // রংপুর বিভাগ
        { lat: 25.7460, lng: 89.2500, loc: "Rangpur (রংপুর)", number: "01769662554, 01769662516" },
        { lat: 25.6270, lng: 88.6336, loc: "Dinajpur (দিনাজপুর)", number: "02589921400, 02589682414" },
        { lat: 25.9310, lng: 88.8560, loc: "Nilphamari (নীলফামারী)", number: "01769682502, 01769682512" },
        { lat: 25.9170, lng: 89.4500, loc: "Lalmonirhat (লালমনিরহাট)", number: "01769682366, 01769682362" },
        { lat: 25.8054, lng: 89.6361, loc: "Kurigram (কুড়িগ্রাম)", number: "01769662534, 01769662536" },
        { lat: 26.0336, lng: 88.4660, loc: "Thakurgaon (ঠাকুরগাঁও)", number: "01769666062, 01769672616" },
        { lat: 26.3411, lng: 88.5542, loc: "Panchagarh (পঞ্চগড়)", number: "01973000662, 01769662661" },
        { lat: 25.3288, lng: 89.5282, loc: "Gaibandha (গাইবান্ধা)", number: "01610652525, 01754585486" },


        // খুলনা বিভাগ
        { lat: 22.6580, lng: 89.7856, loc: "Bagerhat (বাগেরহাট)", number: "01769072514, 01769072536" },
        { lat: 23.9013, lng: 89.1206, loc: "Kushtia (কুষ্টিয়া)", number: "01769552362, 01769552366" },
        { lat: 23.6402, lng: 88.8418, loc: "Chuadanga (চুয়াডাঙ্গা)", number: "01769552380, 01769552382" },
        { lat: 23.7622, lng: 88.6318, loc: "Meherpur (মেহেরপুর)", number: "01769552398, 02479921153" },
        { lat: 23.1725, lng: 89.5120, loc: "Narail (নড়াইল)", number: "01769552456, 01769552457" },
        { lat: 23.4852, lng: 89.4194, loc: "Magura (মাগুরা)", number: "01769554505, 01769554506" },
        { lat: 23.5449, lng: 89.1531, loc: "Jhenaidah (ঝিনাইদহ)", number: "01769552158, 01769552172" },
        { lat: 23.1667, lng: 89.2089, loc: "Jashore (যশোর)", number: "01769552610, 01769009245" },
        { lat: 22.8456, lng: 89.5403, loc: "Khulna (খুলনা)", number: "01769552616, 01769552618" },
        { lat: 22.7185, lng: 89.0706, loc: "Satkhira (সাতক্ষীরা)", number: "01769552536, 01769552548" },

        // ময়মনসিংহ বিভাগ
        { lat: 25.0206, lng: 90.0153, loc: "Sherpur (শেরপুর)", number: "01769202516, 01769202524" },
        { lat: 24.8709, lng: 90.7270, loc: "Netrokona (নেত্রকোনা)", number: "01769202478, 01769202448" },
        { lat: 24.9375, lng: 89.9370, loc: "Jamalpur (জামালপুর)", number: "01769192545, 01769192550" },
        { lat: 24.7471, lng: 90.4203, loc: "Mymensingh (ময়মনসিংহ)", number: "01769208151, 01769208165" },
    ];

    const notice = "সারাদেশে অপরাধ দমনে সেনাবাহিনীকে সহযোগিতা করুন। আপনার এলাকার নম্বর মোবাইলে সেভ করে রাখুন।";

    L.control.attribution({ prefix: false })
        .addAttribution('<span style="font-weight:bold; color:red;">' + notice + '</span>')
        .addTo(map);

    locations.forEach(function (item) {
        L.marker([item.lat, item.lng])
            .addTo(map)
            .bindPopup(`<b>${item.loc}</b><br><b>যোগাযোগ:</b> <a href='tel:${item.number.replace(/[^0-9]/g, "")}' style='color:blue;'>${item.number}</a>`);
    });
});