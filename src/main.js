document.addEventListener("DOMContentLoaded", function () {
    // Hide loader when page is loaded
    setTimeout(function () {
        document.querySelector('.loader').style.display = 'none';
    }, 1500);

    // Initialize map
    var map = L.map('map').setView([23.8103, 90.4125], 7);

    // Base maps
    var osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var satelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    osmLayer.addTo(map);

    // Add base layer control
    var baseLayers = {
        "Street Map": osmLayer,
        "Satellite View": satelliteLayer
    };

    // Custom army icon
    var armyIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/599/599502.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    // Marker cluster group
    var markers = L.markerClusterGroup();

    // Locations data
    const locations = [
        // Rajshahi Division
        { lat: 24.3745, lng: 88.6042, loc: "Rajshahi (রাজশাহী)", number: "01769112386, 01769112388", division: "rajshahi" },
        // ... (all other locations with division added)
        // রাজশাহী বিভাগ
        { lat: 24.3745, lng: 88.6042, loc: "Rajshahi (রাজশাহী)", number: "01769112386, 01769112388" , division: "rajshahi" },
        { lat: 24.5965, lng: 88.2776, loc: "Chapai Nawabganj (চাঁপাইনবাবগঞ্জ)", number: "01769112070, 01769112372" , division: "rajshahi" },
        { lat: 24.0064, lng: 89.2372, loc: "Pabna (পাবনা)", number: "01769122478, 01769112480" , division: "rajshahi" },
        { lat: 24.4534, lng: 89.7007, loc: "Sirajganj (সিরাজগঞ্জ)", number: "01769122462, 01769122264" , division: "rajshahi" },
        { lat: 24.4206, lng: 88.9861, loc: "Natore (নাটোর)", number: "01769112446, 01769112448" , division: "rajshahi" },
        { lat: 24.7936, lng: 88.9318, loc: "Naogaon (নওগাঁ)", number: "01769122115, 01769122108" , division: "rajshahi" },
        { lat: 25.0947, lng: 89.0227, loc: "Joypurhat (জয়পুরহাট)", number: "01769112634" , division: "rajshahi" },
        { lat: 24.8465, lng: 89.3776, loc: "Bogra (বগুড়া)", number: "01769112594, 01769112170" , division: "rajshahi" },

        // বরিশাল বিভাগ
        { lat: 22.7010, lng: 90.3535, loc: "Barishal (বরিশাল)", number: "01769072556, 01769072456" , division: "barishal" },
        { lat: 22.3596, lng: 90.3296, loc: "Patuakhali (পটুয়াখালী)", number: "01769073120, 01769073122" , division: "barishal" },
        { lat: 22.6406, lng: 90.1987, loc: "Jhalokathi (ঝালকাঠি)", number: "01769072108, 01769072122" , division: "barishal" },
        { lat: 22.5790, lng: 89.9720, loc: "Pirojpur (পিরোজপুর)", number: "01769078298, 01769078308" , division: "barishal" },

        // চট্টগ্রাম বিভাগ
        { lat: 22.8240, lng: 91.0967, loc: "Noakhali (নোয়াখালী)", number: "01644466051, 01725038677" , division: "chattogram" },
        { lat: 23.2333, lng: 90.6719, loc: "Chandpur (চাঁদপুর)", number: "01815440543, 01568734976" , division: "chattogram" },
        { lat: 23.0231, lng: 91.3966, loc: "Feni (ফেনী)", number: "01769335461, 01769335434" , division: "chattogram" },
        { lat: 22.9445, lng: 90.8412, loc: "Lakshmipur (লক্ষ্মীপুর)", number: "01721821096, 01708762110" , division: "chattogram" },
        { lat: 23.4607, lng: 91.1809, loc: "Cumilla (কুমিল্লা)", number: "01334616159, 01334616160" , division: "chattogram" },
        { lat: 23.9571, lng: 91.1116, loc: "Brahmanbaria (ব্রাহ্মণবাড়িয়া)", number: "01769322491, 01769332609" , division: "chattogram" },
        { lat: 21.4272, lng: 92.0058, loc: "Cox's Bazar and Chattogram's Lohagara, Patiya, Chandanaish, Banshkhali, Satkania (কক্সবাজার এবং চট্টগ্রামের লোহাগাড়া, পটিয়া, চন্দনাইশ, বাঁশখালী, সাতকানিয়া)", number: "01769107231, 01769107232" , division: "chattogram" },
        { lat: 22.3569, lng: 91.7832, loc: "Chattogram (excluding above upazilas) (চট্টগ্রাম)", number: "01769242012, 01769242014" , division: "chattogram" },

        // Dhaka Metropolitan (ঢাকা মহানগর)
        {
            lat: 23.7386, lng: 90.3844,
            loc: "Lalbagh, Dhanmondi, Mohammadpur, Shyamoli, Agargaon, Mohakhali, Tejgaon, Elephant Road, Katabon (লালবাগ, ধানমন্ডি, মোহাম্মদপুর, শ্যামলী, আগারগাঁও, মহাখালী, তেজগাঁও, এলিফ্যান্ট রোড, কাটাবন)",
            number: "01769051838, 01769051839"  , division: "dhaka"
        },
        {
            lat: 23.7965, lng: 90.4190,
            loc: "Gulshan, Baridhara, Banani, Bashundhara, Badda, Rampura, Shahjahanpur, Uttarkhan, Dakkhinkhan, Banasree (গুলশান, বারিধারা, বনানী, বসুন্ধরা, বাড্ডা, রামপুরা, শাহজাহানপুর, উত্তরখান, দক্ষিণখান, বনশ্রী)",
            number: "01769013102, 01769053154" , division: "dhaka"
        },
        {
            lat: 23.8241, lng: 90.3654,
            loc: "Mirpur 1 to 14, Khilkhet, Uttara, Hazrat Shahjalal International Airport (মিরপুর ১ থেকে ১৪, খিলক্ষেত, উত্তরা, হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দর)",
            number: "01769024210, 01769024211" , division: "dhaka"
        },
        {
            lat: 23.7337, lng: 90.4125,
            loc: "Motijheel, Segunbagicha, Kakrail, Shantinagar, Eskaton, Rajarbagh, Paltan, Gulistan, Old Dhaka (মতিঝিল, সেগুনবাগিচা, কাকরাইল, শান্তিনগর, ইস্কাটন, রাজারবাগ, পল্টন, গুলিস্তান, পুরান ঢাকা)",
            number: "01769092428, 01769095419" , division: "dhaka"
        },

        // ঢাকা বিভাগ (rest)
        { lat: 23.1641, lng: 90.1890, loc: "Madaripur (মাদারীপুর)", number: "01769072102, 01769072103"  , division: "dhaka" },
        { lat: 24.4449, lng: 90.7766, loc: "Kishoreganj (কিশোরগঞ্জ)", number: "01769192382, 01769202366" , division: "dhaka" },
        { lat: 24.2513, lng: 89.9167, loc: "Tangail (টাঙ্গাইল)", number: "01769212651, 01769210870" , division: "dhaka" },
        { lat: 23.0056, lng: 89.8266, loc: "Gopalganj (গোপালগঞ্জ)", number: "01769552436, 01769552448" , division: "dhaka" },
        { lat: 23.7573, lng: 89.6440, loc: "Rajbari (রাজবাড়ী)", number: "01769552514, 01769552528" , division: "dhaka" },
        { lat: 23.9999, lng: 90.4203, loc: "Gazipur (গাজীপুর)", number: "01785349842, 01769092106" , division: "dhaka" },
        { lat: 23.5422, lng: 90.5305, loc: "Munshiganj (মুন্সিগঞ্জ)", number: "01769082798, 01769082784" , division: "dhaka" },
        { lat: 23.8615, lng: 89.8777, loc: "Manikganj (মানিকগঞ্জ)", number: "01769092540, 01769092542" , division: "dhaka" },
        { lat: 23.6238, lng: 90.5000, loc: "Narayanganj (নারায়ণগঞ্জ)", number: "01732051858" , division: "dhaka" },
        { lat: 23.9322, lng: 90.7156, loc: "Narsingdi (নরসিংদী)", number: "01769082766, 01769082778" , division: "dhaka" },
        { lat: 23.2423, lng: 90.4348, loc: "Shariatpur (শরীয়তপুর)", number: "01769097660, 01769097655" , division: "dhaka" },
        { lat: 23.6070, lng: 89.8429, loc: "Faridpur (ফরিদপুর)", number: "01769092102, 01742966162" , division: "dhaka" },

        // Sylhet Division (সিলেট বিভাগ)
        { lat: 24.8949, lng: 91.8687, loc: "Sylhet (সিলেট)", number: "01769177268, 01987833301"   , division: "sylhet" },
        { lat: 24.3745, lng: 91.4155, loc: "Habiganj (হবিগঞ্জ)", number: "01769172596, 01769172616" , division: "sylhet" },
        { lat: 25.0658, lng: 91.3950, loc: "Sunamganj (সুনামগঞ্জ)", number: "01769172420, 01769172430" , division: "sylhet" },
        { lat: 24.4826, lng: 91.7777, loc: "Moulvibazar (মৌলভীবাজার)", number: "01769175680, 01769172400" , division: "sylhet" },


        // রংপুর বিভাগ
        { lat: 25.7460, lng: 89.2500, loc: "Rangpur (রংপুর)", number: "01769662554, 01769662516"   , division: "rangpur" },
        { lat: 25.6270, lng: 88.6336, loc: "Dinajpur (দিনাজপুর)", number: "02589921400, 02589682414"    , division: "rangpur" },
        { lat: 25.9310, lng: 88.8560, loc: "Nilphamari (নীলফামারী)", number: "01769682502, 01769682512"    , division: "rangpur" },
        { lat: 25.9170, lng: 89.4500, loc: "Lalmonirhat (লালমনিরহাট)", number: "01769682366, 01769682362"    , division: "rangpur" },
        { lat: 25.8054, lng: 89.6361, loc: "Kurigram (কুড়িগ্রাম)", number: "01769662534, 01769662536"    , division: "rangpur" },
        { lat: 26.0336, lng: 88.4660, loc: "Thakurgaon (ঠাকুরগাঁও)", number: "01769666062, 01769672616"    , division: "rangpur" },
        { lat: 26.3411, lng: 88.5542, loc: "Panchagarh (পঞ্চগড়)", number: "01973000662, 01769662661"    , division: "rangpur" },
        { lat: 25.3288, lng: 89.5282, loc: "Gaibandha (গাইবান্ধা)", number: "01610652525, 01754585486"    , division: "rangpur" },


        // খুলনা বিভাগ
        { lat: 22.6580, lng: 89.7856, loc: "Bagerhat (বাগেরহাট)", number: "01769072514, 01769072536" , division: "khulna" },
        { lat: 23.9013, lng: 89.1206, loc: "Kushtia (কুষ্টিয়া)", number: "01769552362, 01769552366"  , division: "khulna" },
        { lat: 23.6402, lng: 88.8418, loc: "Chuadanga (চুয়াডাঙ্গা)", number: "01769552380, 01769552382"  , division: "khulna" },
        { lat: 23.7622, lng: 88.6318, loc: "Meherpur (মেহেরপুর)", number: "01769552398, 02479921153"  , division: "khulna" },
        { lat: 23.1725, lng: 89.5120, loc: "Narail (নড়াইল)", number: "01769552456, 01769552457"  , division: "khulna" },
        { lat: 23.4852, lng: 89.4194, loc: "Magura (মাগুরা)", number: "01769554505, 01769554506"  , division: "khulna" },
        { lat: 23.5449, lng: 89.1531, loc: "Jhenaidah (ঝিনাইদহ)", number: "01769552158, 01769552172"  , division: "khulna" },
        { lat: 23.1667, lng: 89.2089, loc: "Jashore (যশোর)", number: "01769552610, 01769009245"  , division: "khulna" },
        { lat: 22.8456, lng: 89.5403, loc: "Khulna (খুলনা)", number: "01769552616, 01769552618"  , division: "khulna" },
        { lat: 22.7185, lng: 89.0706, loc: "Satkhira (সাতক্ষীরা)", number: "01769552536, 01769552548"  , division: "khulna" },

        // ময়মনসিংহ বিভাগ
        { lat: 25.0206, lng: 90.0153, loc: "Sherpur (শেরপুর)", number: "01769202516, 01769202524"  , division: "mymensingh" },
        { lat: 24.8709, lng: 90.7270, loc: "Netrokona (নেত্রকোনা)", number: "01769202478, 01769202448" , division: "mymensingh" },
        { lat: 24.9375, lng: 89.9370, loc: "Jamalpur (জামালপুর)", number: "01769192545, 01769192550" , division: "mymensingh" },
        { lat: 24.7471, lng: 90.4203, loc: "Mymensingh (ময়মনসিংহ)", number: "01769208151, 01769208165" , division: "mymensingh" }
    ];

    // Add markers to cluster group
    locations.forEach(function (item) {
        var marker = L.marker([item.lat, item.lng], { icon: armyIcon })
            .bindPopup(`<b>${item.loc}</b><br><b>Contact:</b> <a href='tel:${item.number.replace(/[^0-9]/g, "")}'>${item.number}</a>
                       <br><button class="get-directions" data-lat="${item.lat}" data-lng="${item.lng}">Get Directions</button>`);
        markers.addLayer(marker);
    });

    map.addLayer(markers);

    // Add layer control
    L.control.layers(baseLayers).addTo(map);

    // Add locate control
    L.control.locate({
        position: 'bottomright',
        strings: {
            title: "Show my location"
        },
        locateOptions: {
            maxZoom: 15
        }
    }).addTo(map);

    // Search functionality
    var searchControl = new L.Control.Search({
        position: 'topleft',
        layer: markers,
        propertyName: 'loc',
        marker: false,
        moveToLocation: function (latlng, title, map) {
            map.setView(latlng, 14);
        }
    });

    searchControl.on('search:locationfound', function (e) {
        e.layer.openPopup();
    }).on('search:collapsed', function (e) {
        markers.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
        map.addLayer(markers);
    });

    map.addControl(searchControl);

    // Division filter
    document.getElementById('division-filter').addEventListener('change', function () {
        var selectedDivision = this.value;

        markers.eachLayer(function (layer) {
            var found = locations.find(loc =>
                loc.lat === layer.getLatLng().lat &&
                loc.lng === layer.getLatLng().lng
            );

            if (selectedDivision === 'all' || found.division === selectedDivision) {
                map.addLayer(layer);
            } else {
                map.removeLayer(layer);
            }
        });
    });

    // Current location button
    document.getElementById('current-location-btn').addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                map.setView([position.coords.latitude, position.coords.longitude], 14);

                // Find nearest camp
                var nearest = findNearestCamp(position.coords.latitude, position.coords.longitude);
                if (nearest) {
                    L.marker([nearest.lat, nearest.lng], { icon: armyIcon })
                        .addTo(map)
                        .bindPopup(`<b>Nearest Camp:</b> ${nearest.loc}<br>Distance: ${(nearest.distance / 1000).toFixed(1)} km`)
                        .openPopup();
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    function findNearestCamp(lat, lng) {
        var nearest = null;
        var minDistance = Infinity;

        locations.forEach(function (loc) {
            var distance = L.latLng(lat, lng).distanceTo(L.latLng(loc.lat, loc.lng));
            if (distance < minDistance) {
                minDistance = distance;
                nearest = { ...loc, distance: distance };
            }
        });

        return nearest;
    }

    // Emergency button
    document.getElementById('emergency-btn').addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var nearest = findNearestCamp(position.coords.latitude, position.coords.longitude);
                if (nearest) {
                    var confirmed = confirm(`Call nearest army camp at ${nearest.loc}?\nNumber: ${nearest.number}`);
                    if (confirmed) {
                        window.location.href = `tel:${nearest.number.replace(/[^0-9]/g, "")}`;
                    }
                }
            });
        } else {
            alert("Please enable location services to find nearest emergency contact.");
        }
    });

    // Directions functionality
    map.on('popupopen', function (e) {
        var popup = e.popup;
        var content = popup.getContent();

        if (content.includes('get-directions')) {
            setTimeout(function () {
                document.querySelector('.get-directions').addEventListener('click', function () {
                    var lat = this.getAttribute('data-lat');
                    var lng = this.getAttribute('data-lng');

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            L.Routing.control({
                                waypoints: [
                                    L.latLng(position.coords.latitude, position.coords.longitude),
                                    L.latLng(lat, lng)
                                ],
                                routeWhileDragging: true,
                                showAlternatives: true,
                                fitSelectedRoutes: true,
                                show: true,
                                collapsible: true
                            }).addTo(map);
                        });
                    } else {
                        alert("Please enable location services to get directions.");
                    }
                });
            }, 100);
        }
    });

    // Populate location list
    function populateLocationList(filter = 'all') {
        var listContainer = document.getElementById('location-list');
        listContainer.innerHTML = '';

        var filteredLocations = filter === 'all' ?
            locations :
            locations.filter(loc => loc.division === filter);

        filteredLocations.forEach(function (loc) {
            var card = document.createElement('div');
            card.className = 'location-card';
            card.innerHTML = `
                <h3>${loc.loc}</h3>
                <p><strong>Division:</strong> ${loc.division.charAt(0).toUpperCase() + loc.division.slice(1)}</p>
                <p><strong>Contact:</strong> <a href="tel:${loc.number.replace(/[^0-9]/g, "")}">${loc.number}</a></p>
                <button class="view-on-map" data-lat="${loc.lat}" data-lng="${loc.lng}">View on Map</button>
            `;
            listContainer.appendChild(card);
        });

        // Add event listeners to view on map buttons
        document.querySelectorAll('.view-on-map').forEach(btn => {
            btn.addEventListener('click', function () {
                var lat = this.getAttribute('data-lat');
                var lng = this.getAttribute('data-lng');
                map.setView([lat, lng], 14);

                markers.eachLayer(function (layer) {
                    if (layer.getLatLng().lat == lat && layer.getLatLng().lng == lng) {
                        layer.openPopup();
                    }
                });
            });
        });
    }

    populateLocationList();

    // Language toggle
    document.getElementById('lang-en').addEventListener('click', function () {
        // Implement English translations
        this.classList.add('active');
        document.getElementById('lang-bn').classList.remove('active');
    });

    document.getElementById('lang-bn').addEventListener('click', function () {
        // Implement Bengali translations
        this.classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
    });

    // Social sharing
    document.getElementById('share-fb').addEventListener('click', function () {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank');
    });

    document.getElementById('share-twitter').addEventListener('click', function () {
        window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href) + '&text=Bangladesh Army Camp Locations', '_blank');
    });

    document.getElementById('share-whatsapp').addEventListener('click', function () {
        window.open('https://wa.me/?text=' + encodeURIComponent('Check out Bangladesh Army Camp Locations: ' + window.location.href), '_blank');
    });

    // Feedback modal
    var modal = document.getElementById('feedback-modal');
    var btn = document.createElement('button');
    btn.className = 'feedback-btn';
    btn.innerHTML = '<i class="fas fa-comment"></i> Feedback';
    document.body.appendChild(btn);

    btn.onclick = function () {
        modal.style.display = "block";
    }

    document.querySelector('.close-btn').onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById('feedback-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your feedback!');
        modal.style.display = "none";
        this.reset();
    });

    // Service worker registration for PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(function (registration) {
                console.log('ServiceWorker registration successful');
            }, function (err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
});