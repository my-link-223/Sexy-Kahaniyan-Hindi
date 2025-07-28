export type Story = {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  category: string;
  image: string;
  aiHint: string;
  content: string;
  trending: boolean;
};

export const stories: Story[] = [
  {
    id: 1,
    slug: "bhabhi-ki-garam-raat",
    title: "भाभी की गरम रात",
    author: "Rahul Kumar",
    date: "2024-07-28",
    readingTime: "15 min read",
    tags: ["#भाभी", "#रात", "#पहली_बार"],
    category: "Bhabhi",
    image: "https://placehold.co/600x400.png",
    aiHint: "sensual couple",
    content: `रात का सन्नाटा गहरा रहा था। शहर की बत्तियां एक-एक कर बुझ रही थीं, लेकिन मेरे दिल में एक अजीब सी बेचैनी थी। आज घर में सिर्फ मैं और मेरी भाभी, रिया, थे। भैया ऑफिस के काम से बाहर गए हुए थे। रिया भाभी हमेशा से मेरे लिए एक दोस्त की तरह रही हैं, लेकिन आज उनकी मौजूदगी कुछ अलग महसूस हो रही थी।\n\nमैंने पानी पीने के बहाने किचन की ओर कदम बढ़ाए। रिया भाभी वहां पहले से ही मौजूद थीं, रात की हल्की चांदनी में उनकी silhouette बेहद खूबसूरत लग रही थी। उन्होंने मुड़कर मुझे देखा और मुस्कुराईं, "नींद नहीं आ रही, देव?" उनकी आवाज़ में शहद जैसी मिठास थी।\n\n"नहीं भाभी, बस यूँ ही," मैंने कहा और गिलास में पानी भरने लगा। हमारी नज़रें मिलीं और एक पल के लिए वक्त जैसे थम गया। उनकी आँखों में कुछ ऐसा था जो मैंने पहले कभी नहीं देखा था - एक आमंत्रण, एक रहस्य। उस एक पल ने हमारे बीच की सारी सीमाओं को धुंधला कर दिया। यह रात सिर्फ एक आम रात नहीं थी; यह एक नई कहानी की शुरुआत थी, एक ऐसी कहानी जो हम दोनों की ज़िंदगी हमेशा के लिए बदलने वाली थी।`,
    trending: true,
  },
  {
    id: 2,
    slug: "college-ka-pehla-pyaar",
    title: "कॉलेज का पहला प्यार",
    author: "Priya Sharma",
    date: "2024-07-27",
    readingTime: "12 min read",
    tags: ["#कॉलेज", "#प्यार", "#रोमांस"],
    category: "College",
    image: "https://placehold.co/600x400.png",
    aiHint: "young couple",
    content: "कॉलेज के पहले दिन की वो घबराहट आज भी याद है। हजारों नए चेहरे, बड़ी-बड़ी बिल्डिंग्स और एक अजीब सा डर। उसी भीड़ में मैंने उसे पहली बार देखा था, आयशा को। उसकी हँसी में एक जादू था और उसकी आँखों में एक चमक। हमारी दोस्ती धीरे-धीरे प्यार में बदल गई। लेक्चर्स बंक करके घूमना, कैंटीन में घंटों बातें करना और एक-दूसरे के सपनों को अपना बनाना - वो दिन ही कुछ और थे। यह कहानी है उसी पहले, मासूम और दीवाने प्यार की।",
    trending: true,
  },
  {
    id: 3,
    slug: "padosan-ki-khidki",
    title: "पड़ोसन की खिड़की",
    author: "Vikram Singh",
    date: "2024-07-26",
    readingTime: "10 min read",
    tags: ["#पड़ोसन", "#खिड़की", "#फंतासी"],
    category: "Padosan",
    image: "https://placehold.co/600x400.png",
    aiHint: "woman window",
    content: "मेरे बेडरूम की खिड़की ठीक उसके बेडरूम की खिड़की के सामने खुलती थी। सिमरन, मेरी नई पड़ोसन। उसे देखे बिना मेरा दिन पूरा नहीं होता था। कभी वो अपने बालों को संवारती, तो कभी गुनगुनाती। हमारी बातें आँखों-ही-आँखों में होती थीं। एक दिन, हिम्मत करके मैंने उसे एक कागज़ पर 'हाय' लिखकर दिखाया। उसने मुस्कुरा कर जवाब दिया। बस, वहीं से शुरू हुई एक अनकही, अनदेखी प्रेम कहानी।",
    trending: false,
  },
  {
    id: 4,
    slug: "office-wali-girlfriend",
    title: "ऑफिस वाली गर्लफ्रेंड",
    author: "Anjali Mehta",
    date: "2024-07-25",
    readingTime: "18 min read",
    tags: ["#ऑफिस", "#बॉस", "#सीक्रेट"],
    category: "Office",
    image: "https://placehold.co/600x400.png",
    aiHint: "office romance",
    content: "ऑफिस का माहौल हमेशा तनावपूर्ण रहता है, लेकिन मेरे लिए वो जगह एक खूबसूरत एहसास बन गई थी। वजह थी, नेहा, मेरी कलीग। हम साथ में लंच करते, प्रोजेक्ट्स पर काम करते और धीरे-धीरे एक-दूसरे के बहुत करीब आ गए। हमारा रिश्ता ऑफिस की फाइलों में छिपा एक राज़ था। late-night काम के बहाने साथ वक्त बिताना और कॉफ़ी मशीन के पास चोरी-छुपे मिलना - यह हमारे प्यार का तरीका था।",
    trending: true,

  },
  {
    id: 5,
    slug: "baarish-mein-romance",
    title: "बारिश में रोमांस",
    author: "Aakash Verma",
    date: "2024-07-24",
    readingTime: "8 min read",
    tags: ["#बारिश", "#रोमांस", "#चाय"],
    category: "Romance",
    image: "https://placehold.co/600x400.png",
    aiHint: "rain couple",
    content: "उस शाम बारिश बहुत तेज़ थी। मैं ऑफिस से घर लौट रहा था कि अचानक बस स्टॉप पर वो मिली, भीगती हुई। मैंने उसे अपनी छतरी ऑफर की। बस, वहीं से हमारी कहानी शुरू हुई। बारिश की बूंदों के साथ हमारी बातें, चाय की चुस्कियों के साथ हमारी हँसी और भीगी सड़कों पर साथ चलना। उस बारिश ने हमें हमेशा के लिए एक-दूसरे से जोड़ दिया।",
    trending: false,
  },
  {
    id: 6,
    slug: "anjaan-safar",
    title: "अनजान सफ़र",
    author: "Kavita Reddy",
    date: "2024-07-23",
    readingTime: "20 min read",
    tags: ["#ट्रेन", "#सफ़र", "#अजनबी"],
    category: "Travel",
    image: "https://placehold.co/600x400.png",
    aiHint: "train journey",
    content: "वो एक लंबी ट्रेन यात्रा थी। मैं अपनी सीट पर बैठा किताबें पढ़ रहा था, तभी वो सामने आकर बैठी। उसकी आँखों में एक अजीब सी उदासी थी। हमने बातें शुरू कीं और पता चला कि हम दोनों एक ही मंज़िल के मुसाफिर हैं। 24 घंटे के उस सफ़र में हमने अपनी पूरी ज़िंदगी एक-दूसरे से बांट ली। वो सफ़र खत्म हो गया, लेकिन हमारी कहानी वहीं से शुरू हुई।",
    trending: false,
  },
];

export const categories = [
  { title: "Bhabhi", image: "https://placehold.co/300x400.png", aiHint: 'indian woman' },
  { title: "College", image: "https://placehold.co/300x400.png", aiHint: 'college couple' },
  { title: "Padosan", image: "https://placehold.co/300x400.png", aiHint: 'woman looking' },
  { title: "Office", image: "https://placehold.co/300x400.png", aiHint: 'office romance' },
  { title: "Desi", image: "https://placehold.co/300x400.png", aiHint: 'village woman' },
];
