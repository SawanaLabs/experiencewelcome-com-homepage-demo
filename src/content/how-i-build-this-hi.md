---
title: "How I Build This: एक Figma assignment से शुरुआत"
description: "यह build retrospective बताता है कि Figma landing page assignment को maintainable, agent-ready front-end delivery system में कैसे बदला गया।"
---

# How I Build This: एक Figma assignment से शुरुआत

## विषय-सूची

- [0. भविष्य के लिए AI Native Product Engineer](#0-भविष्य-के-लिए-ai-native-product-engineer)
- [1. एक Figma assignment से शुरुआत](#1-एक-figma-assignment-से-शुरुआत)
- [2. Project बनाना शुरू करना](#2-project-बनाना-शुरू-करना)
  - [2.1 ऐसा project बनाना जो आगे भी बढ़ सके](#21-ऐसा-project-बनाना-जो-आगे-भी-बढ़-सके)
  - [2.2 Agents के लिए readable context छोड़ना](#22-agents-के-लिए-readable-context-छोड़ना)
  - [2.3 Figma को requirement की तरह पढ़ना](#23-figma-को-requirement-की-तरह-पढ़ना)
  - [2.4 Design को real page तक ले जाना](#24-design-को-real-page-तक-ले-जाना)
  - [2.5 Verification loop से delivery को संभालना](#25-verification-loop-से-delivery-को-संभालना)
- [3. यह अंत में क्या बना](#3-यह-अंत-में-क्या-बना)

## 0. भविष्य के लिए AI Native Product Engineer

पहले, किसी नए सदस्य का project में सचमुच landing करना आम तौर पर context handoff की लागत लेकर आता था। उसका एक हिस्सा team की explanation से आता था, और दूसरा हिस्सा खुद code पढ़ने, docs पढ़ने और commands चलाने से। किसी को directory structure समझाना पड़ता था, किसी को बताना पड़ता था कि components इस तरह क्यों split किए गए हैं, और किसी को यह स्पष्ट करना पड़ता था कि कौन से commands चलाए जा सकते हैं, कौन से checks पास होने चाहिए, और किन जगहों को casually नहीं बदलना चाहिए। Project जितना mature होता है, उसमें knowledge उतनी बढ़ती है, और नए व्यक्ति के लिए context उतना ही भारी हो जाता है। Team में अधिक लोग जोड़ने से output तुरंत नहीं बढ़ता। Communication, synchronization और rework अक्सर पहले friction बनते हैं।

जब AI developer के रोज़मर्रा workflow का हिस्सा बनने लगता है, तो इस स्थिति में एक नई संभावना दिखती है। जब कोई नया सदस्य project संभालता है, तो वह शायद पहले AI से पूछे: यह feature ऐसे क्यों implement किया गया? इसके पीछे कौन सा historical context और trade-off था? Project कौन सा technology stack इस्तेमाल करता है? अगर किसी module को बदलना हो, तो पहले कौन सी directory और कौन से docs देखने चाहिए? AI project में landing करने का context entry point बन जाता है। इसलिए अच्छी engineering practice को human developers और Coding Agents, दोनों की सेवा करनी चाहिए। Directories, docs, tests, quality gates, implementation habits और verification paths ऐसे होने चाहिए कि कोई नया व्यक्ति या नया Agent session project को जल्दी समझ सके, शुरुआत की जगह जान सके, और अपने काम की correctness judge कर सके।

एक अधिक ideal state यह है: नए member के project में landing करने के बाद उसे hidden context पूरा करने में लंबा समय नहीं लगाना पड़ता। वह code, docs और AI से project map जल्दी बना सकता है, फिर existing decisions के ऊपर अपनी judgment जोड़ सकता है। यह नया member कोई colleague भी हो सकता है, और नया Agent session भी। Project में प्रवेश करने के बाद दोनों को product surface, engineering constraints और पहले से लिए गए decisions समझ आने चाहिए, और उसी context पर आगे काम करना चाहिए।

इस state को सच बनाने के लिए कम से कम दो lines साथ में काम करनी होंगी।

पहली line project engineering practice है। इसमें repository के वे सभी hard delivery assets आते हैं जो सचमुच delivery में भाग लेते हैं: directory structure, actual code, components, styles, content, i18n, assets, docs, tests और quality gates। ये सब मिलकर team के लिए best practices बनाते हैं, ताकि human developers और Coding Agents एक ही material से project को समझें, modify करें और verify करें। इसका value project को केवल अधिक architectural दिखाना नहीं है। मुख्य बात यह है कि हर आगे का change एक clear place, boundary और judgment basis के साथ आए।

दूसरी line Agent Harness है। यहां Harness को Agent के work behavior design करने वाली mechanism की तरह समझा जा सकता है। यह project context, skills, tools, verification habits और delivery standards को मिलाकर Agent को बताता है कि नई session में task कैसे समझना है, path कैसे चुनना है, implementation कैसे करनी है, result कैसे verify करना है, और work result humans को कैसे deliver करना है। इसका goal Agent autonomy को verifiable engineering track पर लाना है। Agent को project context जानना होता है, available skills और tools जानने होते हैं, Figma या requirement से constraints निकालने होते हैं, और implementation के बाद कौन से checks चलाने हैं, कौन से pages खोलने हैं, और कौन सा evidence छोड़ना है यह भी जानना होता है।

जब ये दोनों lines पर्याप्त रूप से अच्छी होती हैं, तो एक बहुत concrete business scenario सामने आता है: team को नया Landing Page जोड़ना है, या homepage के किसी section को adjust करना है। Human developer docs, directories और code से काम जल्दी समझ सकता है। Coding Agent भी नई session में वही context पढ़ सकता है, वही implementation entry point खोज सकता है, और वही verification flow चला सकता है। Project delivery किसी एक व्यक्ति के दिमाग में मौजूद hidden knowledge पर निर्भर रहने के बजाय ऐसे system पर निर्भर होने लगती है जिसे पढ़ा, चलाया और reuse किया जा सकता है।

इस काम करने के तरीके में AI Native Product Engineer की भूमिका concrete होने लगती है। वे पहले इस system के user होते हैं: AI, code और docs से project समझते हैं और कोई specific module या page deliver करते हैं। उसी समय, वे delivery system को लगातार improve भी करते हैं, context, docs, best practices और verification paths को साफ करते हैं, ताकि अगली landing आसान हो सके।

ये ideas किसी abstract concept से शुरू नहीं हुए। ये एक बहुत specific implementation task से आए। Task material एक static Figma visual reference था, जो Awwwards 2024 websites को collect करने वाली Community file से आया था, और Experience homepage reproduce करने का target था। असली goal केवल visual result match करना नहीं था। एक static page को assessable front-end work में आगे बढ़ाना था: reasonable responsive behavior, necessary interaction enhancement, multilingual content organization, और performance तथा SEO की verifiable foundations चाहिए थीं।

## 1. एक Figma assignment से शुरुआत

यह complete design system, component notes और interaction annotations वाला formal handoff नहीं था। File खोलने पर एक Community file दिखी जिसमें कई long homepage visuals साथ-साथ रखे हुए थे, और Experience page implementation scope के रूप में तय था। यह अधिक static visual reference जैसा था: page outcome सामने था, hierarchy, rhythm, colors, images और text दिख रहे थे, लेकिन front-end implementation में जाने के लिए जो कई चीजें चाहिए होती हैं, वे automatically मौजूद नहीं थीं।

उदाहरण के लिए, Figma में page बहुत लंबा visual mockup हो सकता है, लेकिन browser में उसे अलग-अलग widths पर फिर से flow करना होता है। Mockup में button केवल shape और text की line हो सकता है, लेकिन product में उसे hover, active, focus और mobile touch feedback चाहिए। Page का English content visual रूप से reproduce किया जा सकता है, लेकिन task multilingual भी मांगता है, इसलिए content organization केवल इस एक visual के लिए नहीं बन सकता। Performance और SEO भी ऐसे ही हैं। वे Figma layers से अपने आप नहीं निकलते, उन्हें implementation के दौरान engineering structure में actively लाना पड़ता है।

इसलिए पहला step जल्दी से code लिखना नहीं था। अधिक ज़रूरी step task को साफ पढ़ना था: Figma visual target था, Experience homepage boundary था, और final deliverable ऐसा front-end work था जिसे open, review, test और maintain किया जा सके। इस work को original visual का सम्मान करना था और static material में स्वाभाविक रूप से missing responsive, interaction, content, accessibility, performance और verification evidence भी जोड़ना था।

यहीं से task interesting होने लगा। Surface पर यह Landing Page reproduction जैसा दिखता था। Requirements पूरी तरह पढ़ने के बाद यह compressed front-end delivery scenario जैसा दिखा। यह developer से AI use करने को कहता था, और साथ में यह भी कहता था कि किन हिस्सों में उसकी अपनी judgment, adjustment और trade-off शामिल थे। दूसरे शब्दों में, AI participation खुद delivery quality का हिस्सा बन गया। Code generate करना मुश्किल नहीं है। मुश्किल यह है कि AI output को ऐसे engineering process में लाया जाए जिसे review, correct और verify किया जा सके।

इसीलिए यह project शुरुआत से one-off page imitation की तरह treat करने लायक नहीं था। बेहतर starting point यह था कि Figma को input माना जाए, webpage को output माना जाए, और बीच का वह process जिसे humans और Agents समझ सकें, collaborate कर सकें और verify कर सकें, असली system माना जाए। बाद की project structure, docs, i18n, component boundaries, verification commands और browser review इसी judgment से निकले।

## 2. Project बनाना शुरू करना

यह chapter actual build process में प्रवेश करता है। यह time और judgment के अनुसार आगे बढ़ेगा, और दिखाएगा कि empty project से repository, Harness, Figma reading, page implementation और verification loop कैसे बनाए गए।

### 2.1 ऐसा project बनाना जो आगे भी बढ़ सके

यहां early project judgment पर बात होगी: app structure, package management, docs system, i18n, component boundaries, asset management और quality gates ने project को maintainable कैसे बनाया।

### 2.2 Agents के लिए readable context छोड़ना

यहां project के माध्यम से Harness समझाया जाएगा: Model, repository context, skills और tools कैसे combine होते हैं ताकि Agent नई session में भी end-to-end काम कर सके।

### 2.3 Figma को requirement की तरह पढ़ना

यहां Figma file को inspect, scope और read करने का तरीका आएगा, और design information को implementation constraints में बदलने का तरीका भी, ताकि raw coordinates को final layout API न माना जाए।

### 2.4 Design को real page तक ले जाना

यहां actual development process आएगा: components, responsive layout, real assets, localized content, motion, interaction, और build के दौरान हुए specific trade-offs।

### 2.5 Verification loop से delivery को संभालना

यहां result verify करने का तरीका आएगा: tests, quality commands, browser checks, visual review, performance feedback और deployment evidence कैसे loop बनाते हैं।

## 3. यह अंत में क्या बना

यह chapter पूरे essay को close करता है: project अंत में Landing Page work के लिए agent-ready front-end delivery system बना, और साथ ही एक transferable method भी छोड़ गया।
