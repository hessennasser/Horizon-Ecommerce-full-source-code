import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { AppContext } from '../AppContext';
import Breadcrumbs from '../components/Breadcrumbs';

const Privacy = () => {
    const { i18n } = useTranslation();
    const { websiteInfo } = useContext(AppContext);

    return (
        <div className='container py-10 min-h-[300px]'>
            <Breadcrumbs />
            {/* <p className='mt-10'>
                {i18n.language === "en" ? websiteInfo?.privacy?.en : websiteInfo?.privacy?.ar}
            </p> */}
            <p>
                {
                    i18n.language === "ar" ?
                        <div className="bg-gray-100 p-4">
                            <h1 className="text-3xl font-bold mb-4">مرحبًا بك في هوريزون</h1>

                            <p>
                                تحدد سياسة الخصوصية هذه الأسس التي ستتم معاملتها بها أي بيانات شخصية، بما في ذلك على سبيل المثال لا الحصر تفاصيل الدفع والمعلومات الأخرى التي نجمعها منك أو من مصادر أخرى أو التي تقدمها لنا ("المعلومات") فيما يتعلق بوصولك واستخدامك لمنصة هوريزون، و/أو تطبيق هوريزون للهواتف المحمولة (بشكل مشترك، "المنصة")، والخدمات والتطبيقات (بشكل مشترك، "الخدمات"). نحن ندرك أهمية المعلومات بالنسبة لك، ونحن ملتزمون بحماية خصوصيتك واحترامها. يرجى قراءة ما يلي بعناية لفهم ممارساتنا بشأن معلوماتك. من خلال استخدام خدماتنا، فإنك توافق على معالجة معلوماتك وفقًا لهذه السياسة.
                            </p>

                            <p>
                                الإشارات في هذه السياسة إلى "نحن"، "نحن" أو "نحن" (أو ما شابهها) هي إشارات إلى هوريزون للتجارة الإلكترونية. الإشارات إلى "المستخدم" أو "أنت" (أو ما شابهها) تشير إليك كفرد أو ككيان قانوني على حد سواء.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">المعلومات التي قد نجمعها منك</h2>
                            <ul className="list-disc list-inside ml-6">
                                <li>المعلومات التي تقدمها عند ملء الاستمارات على منصتنا، بما في ذلك المعلومات المقدمة عند التسجيل لاستخدام منصتنا والتسجيلات المشتركة الأخرى (على سبيل المثال، تسجيل الدخول عبر وسائل التواصل الاجتماعي)، والاشتراك في خدماتنا، ونشر المواد أو طلب خدمات إضافية؛</li>
                                <li>المعلومات التي تقدمها عند المشاركة في مسابقة أو ترويج عبر منصتنا، وتقديم التقييمات أو الآراء أو التعليقات على منصتنا؛</li>
                                <li>المعلومات التي تقدمها لنا، أو التي قد نجمعها منك، عند الإبلاغ عن مشكلة على منصتنا؛</li>
                                <li>سجل المراسلات إذا تواصلت معنا؛</li>
                                <li>معلومات عامة غير معمقة وغير شخصية؛</li>
                                <li>إذا قمت بتنزيل أو استخدام تطبيق الهاتف المحمول الخاص بنا، قد نكون لدينا وصولًا إلى تفاصيل حول موقعك وجهازك المحمول، بما في ذلك معرف فريد لجهازك؛</li>
                                <li>تفاصيل المعاملات التي تقوم بها عبر منصتنا وتنفيذ طلباتك؛</li>
                                <li>تفاصيل حول جهاز الكمبيوتر الخاص بك، بما في ذلك على سبيل المثال لا الحصر عنوان IP الخاص بك، ونظام التشغيل، ونوع المتصفح، بالإضافة إلى معلومات حول استخدام الإنترنت العام لديك (على سبيل المثال، من خلال استخدام التكنولوجيا التي تخزن المعلومات أو تحصل عليها من جهازك، مثل ملفات تعريف الارتباط وبكسل التتبع وبيانات الويب، إلخ، (مجتمعة، "ملفات تعريف الارتباط"))؛</li>
                                <li>عنوان بريدك الإلكتروني من طرف ثالث إذا أشرت إلى أنك قد قمت بالموافقة على مشاركة معلوماتك معنا؛ و</li>
                                <li>أي معلومات أخرى نعتبرها ضرورية لتعزيز تجربتك على المنصة.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-4">كيف سنستخدم معلوماتك</h2>
                            <ul className="list-disc list-inside ml-6">
                                <li>لتزويدك بمعلومات أو منتجات أو خدمات تطلبها منا أو التي نعتقد أنها قد تهمك، حيث قد أكدت الموافقة على التواصل لأغراض مثل هذه؛</li>
                                <li>لتقديم خدمات تعتمد على الموقع، مثل الإعلانات ونتائج البحث ومحتوى مخصص آخر؛</li>
                                <li>لأداء التزاماتنا الناشئة عن العقود التي تمت بينك وكيان آخر يستخدم منصتنا أو بينك ونا؛</li>
                                <li>لتحسين خدماتنا وتقديم خدمة أفضل وأكثر تخصيصًا لك؛</li>
                                <li>لضمان عرض المحتوى من منصتنا بأكثر طريقة فعالة بالنسبة لك وللجهاز الذي تستخدمه للوصول إلى منصتنا؛</li>
                                <li>لإخطارك بالتغييرات على خدماتنا؛</li>
                                <li>لأي سبب آخر نعتبره ضروريًا لتعزيز تجربتك على المنصة؛</li>
                                <li>لإدارة برامج التحفيز والاستجابة لطلباتك للحصول على حوافز، و/أو السماح لك بالمشاركة في السحوبات وإخطارك إذا كنت فائزًا في السحوبات.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-4">إلى من سنكشف معلوماتك</h2>
                            <p>
                                المعلومات حول عملائنا هي جزء مهم من أعمالنا. نشارك معلوماتك فقط كما هو موضح أدناه ومع الشركات التي تتبع ممارسات على الأقل محمية بنفس ما هو موجود في هذه السياسة:
                            </p>

                            <p className="ml-6">
                                <strong>الشركات الأخرى.</strong> لتقديم خدماتنا لك، قد نتعامل مع شركات تابعة لنا و/أو مقدمي خدمات غير تابعين (مثل شركات اللوجستيات المستخدمة لتوصيل المنتجات إليك، وشركات التسويق، ومعالجي الدفع لمعالجة المعاملات عبر الإنترنت، إلخ). قد نشمل شركات أخرى في معاملاتك، والتي قد تخزن معلوماتك في محفظة رقمية لجعل استخدام خدماتنا أكثر كفاءة.
                            </p>

                            <p className="ml-6">
                                تفهم أنه من المهم أن تكون لدى مثل هذه الشركات وصول إلى المعلومات ذات الصلة لأداء وظائفها. سنضمن أن تلك الشركات لا تستخدم معلوماتك لأغراض أخرى. قد نتلقى أيضًا معلومات من هذه الشركات (مثل معلومات التسليم وعنوان محدثة)، والتي قد نستخدمها (مثل لتصحيح سجلاتنا وتوصيل مشترياتك التالية). من خلال استخدام منصتنا، فإنك توافق بحرية وبشكل خاص على نقل، تخزين، استخدام، والكشف عن معلوماتك بين الشركات التابعة لنا و/أو مقدمي الخدمات غير التابعين، أينما كانوا. ستلزم هذه الشركات بشكل تعاقدي بالاحترام لسرية معلوماتك.
                            </p>

                            <p className="ml-6">
                                <strong>العروض التسويقية والترويجية.</strong> قد نستخدم أيضًا معلوماتك لتزويدك بمعلومات حول السلع والخدمات التي قد تكون مهتمًا بها وتعزيز تجربتك على المنصة، ورسائل الخدمة، وميزات جديدة، وتحسينات، وعروض خاصة، وأحداث تهمك. قد نتواصل معك عبر قنوات متنوعة، بما في ذلك على سبيل المثال لا الحصر البريد الإلكتروني، وإشعارات الدفع، وإشعارات الويب، والبريد، والهاتف، ورسائل داخل التطبيق، وبطاقات تغذية الأخبار.
                            </p>

                            <p className="ml-6">
                                قد نسمح أيضًا لأطراف ثالثة باستخدام معلوماتك. على سبيل المثال، قد نقدم للمعلنين معلومات لمساعدتهم في الوصول إلى الجمهور الذي يرغبون في استهدافه ولتمكيننا من الامتثال لالتزاماتنا تجاه المعلنين (على سبيل المثال، من خلال عرض إعلاناتهم لجمهور مستهدف).
                            </p>

                            <p className="ml-6">
                                بالإضافة إلى ذلك، قد يُطلب منك تقديم معلومات إضافية للمشاركة في بعض أنشطتنا في مجال أبحاث السوق، بما في ذلك المسابقات والترويج. على سبيل المثال، إذا فزت في مسابقة، قد يُطلب منك تقديم بيانات شخصية إضافية لتحديد أهليتك وتوفير الجائزة. قد يتم جمع هذه المعلومات من قبلنا أو من قبل شركاء الرعاية أو البائعين للترويج. عليك أن تراجع سياسات الخصوصية لمثل هؤلاء الأطراف الثالثة لرؤية كيف قد تستخدم أي معلومات يتم جمعها.
                            </p>

                            <p className="ml-6">
                                <strong>نقل الأعمال.</strong> في حالة اكتساب كلي أو جزئي لأصولنا، ستكون معلومات العملاء واحدة من الأصول المنقولة.
                            </p>

                            <p className="ml-6">
                                <strong>حماية منصتنا والآخرين.</strong> نحن نُفصح عن حساب ومعلومات أخرى عندما نعتقد أن مثل هذا الإفصاح مناسب للامتثال للقانون وللتحقيقات في مجال إنفاذ القانون ولحماية حقوق مستخدمينا أو الآخرين. يتضمن ذلك تبادل المعلومات مع شركات ومنظمات أخرى لأسباب مختلفة، مثل حماية الاحتيال وتقليل مخاطر الائتمان.
                            </p>

                            <p className="mt-4">
                                يُرجى ملاحظة أن منصتنا قد تحتوي في بعض الأحيان على روابط إلى مواقع الشبكات الشريكة والمعلنين والشركاء التابعين. إذا قمت بمتابعة رابط إلى أي من هذه المواقع، يُرجى ملاحظة أن هذه المواقع لها سياسات خصوصية خاصة بها وأننا لا نتحمل أي مسؤولية أو التزام بخصوصيات هذه السياسات. يُرجى التحقق من هذه السياسات قبل تقديم أي بيانات شخصية أو معلومات أخرى إلى هذه المواقع.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">كيف نقوم بتخزين معلوماتك</h2>
                            <p>
                                المعلومات التي نجمعها منك قد تنقل إلى وتخزن في وجهة خارج مصر. قد تتم معالجة هذه المعلومات أيضًا بواسطة موظفين يعملون خارج مصر ويعملون لصالحنا أو لصالح أحد موردينا. قد يشارك هؤلاء الموظفون في تنفيذ طلبك، ومعالجة تفاصيل الدفع الخاصة بك، وتقديم خدمات الدعم. سنقوم بتخزين معلوماتك لمدة ما يلزم لتحقيق الأغراض المشار إليها في هذه السياسة أو كما يُسمح أو يُلزم بموجب القانون. قد يتم نقل معلوماتك بين شركات الجماعة ومقدمي الخدمات غير التابعين الموثوقين الذين نتعامل معهم.
                            </p>

                            <p className="mt-4">
                                يجب أن تتخذ جميع الإجراءات اللازمة لضمان أن معلوماتك تكون آمنة. سنتخذ إجراءات أمان معقولة ومناسبة لحماية معلوماتك من التعديل أو الكشف عنها أو استخدامها بشكل غير قانوني. ومع ذلك، لا يمكننا ضمان أمان معلوماتك عند نقلها إلى منصاتنا ومنصات الشركات المتعاقدة معنا عبر الإنترنت.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">حقوقك</h2>
                            <p>
                                يمكنك ممارسة حقوقك بموجب قوانين حماية البيانات، بما في ذلك الحق في الوصول إلى معلوماتك، وتصحيحها، وحذفها، وقيود معالجتها، ونقلها، وسحب موافقتك على معالجتها في أي وقت. إذا كنت ترغب في ممارسة أي من هذه الحقوق، يُرجى الاتصال بنا.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">التغييرات على سياستنا</h2>
                            <p>
                                نحتفظ بحق تحديث هذه السياسة بشكل دوري. سيتم نشر أي تغييرات على هذه الصفحة مع تحديد التاريخ النافذ للسياسة المعنية. ننصحك بمراجعة هذه الصفحة بانتظام لمعرفة أحدث معلوماتنا حول ممارسات الخصوصية.
                            </p>

                            <p className="mt-4">
                                للتواصل معنا بشأن أي استفسار حول هذه السياسة أو ممارسات الخصوصية لدينا، يُرجى الاتصال بنا عبر البريد الإلكتروني على عنوان البريد الإلكتروني التالي:
                                <a href="mailto:privacy@horizon.com">privacy@horizon.com</a>.
                            </p>
                        </div>
                        :
                        <div className="bg-gray-100 p-4">
                            <h1 className="text-3xl font-bold mb-4">Welcome to Horizon</h1>

                            <p>
                                This Privacy Policy sets out the basis on which any personal data, including but not limited to payment details and other information we collect from you or other sources or that you provide to us ("Information") will be handled by us in connection with your access and use of <a href="https://www.horriizon.com" className="text-blue-500 underline">www.horriizon.com</a>, and/or the Horizon mobile application (collectively, the "Platform"), services and applications (collectively, the "Services"). We understand the importance you place on the Information, and we are committed to protecting and respecting your privacy. Please read the following carefully to understand our practices regarding your Information. By using our Services, you agree to the handling of your Information in accordance with this Privacy Policy.
                            </p>

                            <p>
                                References in this Privacy Policy to "we", "our" or "us" (or similar) are references to Horizon E Commerce. References to "user" or "you" (or similar) are references to you as an individual or legal entity as the case may be.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">WHAT INFORMATION WE MAY COLLECT FROM YOU</h2>
                            <ul className="list-disc list-inside ml-6">
                                <li>Information that you provide by filling in forms on our Platform, including information provided at the time of registering to use our Platform and other co-registrations (e.g. social media logins), subscribing to our Services, posting material or requesting further services;</li>
                                <li>The Information you provide when you enter a competition or promotion via our Platform, provide reviews, testimonials or feedback on our Platform;</li>
                                <li>Information you provide us, or that we may collect from you, when you report a problem with our Platform;</li>
                                <li>A record of correspondence if you contact us;</li>
                                <li>General, aggregated, demographic and non-personal Information;</li>
                                <li>If you download or use our mobile application, we may have access to details about your location and your mobile device, including a unique identifier for your device;</li>
                                <li>Details of transactions you carry out through our Platform and of the fulfillment of your orders;</li>
                                <li>Details about your computer, including but not limited to your IP address, operating system, and browser type, as well as information about your general internet usage (e.g. by using technology that stores information on or gains access to your device, such as cookies, tracking pixels, web beacons, etc., (together, "Cookies"));</li>
                                <li>Your email address from a third party if you indicate that you have consented to that third party sharing your Information with us; and</li>
                                <li>Any other Information we consider necessary to enhance your experience on the Platform.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-4">HOW WE WILL USE YOUR INFORMATION</h2>
                            <ul className="list-disc list-inside ml-6">
                                <li>To provide you with information, products, or services that you request from us or which we feel may interest you, where you have consented to be contacted for such purposes;</li>
                                <li>To provide you with location-based services, such as advertising, search results, and other personalized content;</li>
                                <li>To carry out our obligations arising from any contracts entered into between you and another entity using our Platform or between you and us;</li>
                                <li>To improve our Services and to deliver a better and more personalized service to you;</li>
                                <li>To ensure that content from our Platform is presented in the most effective manner for you and the device you use to access our Platform;</li>
                                <li>To notify you about changes to our Services;</li>
                                <li>For any other reason which we deem necessary to enhance your experience of the Platform;</li>
                                <li>To administer and manage our incentives programs and fulfill your requests for incentives, and/or to allow you to participate in sweepstakes and to notify you if you are a sweepstakes winner.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-4">TO WHOM WE MAY DISCLOSE YOUR INFORMATION</h2>
                            <p>
                                Information about our customers is an important part of our business. We share your Information only as described below and with businesses that follow practices at least as protective as those described in this Privacy Policy:
                            </p>

                            <p className="ml-6">
                                <strong>Other Businesses.</strong> To offer you our Services, we may engage with businesses who are affiliates of us and/or non-affiliated service providers (e.g. logistics businesses used to deliver products to you, marketing companies, payments processors to process online transactions, etc.). We may involve other businesses in your transactions, who may store your Information in a digital wallet to make your use of our Services more efficient.
                            </p>

                            <p className="ml-6">
                                You understand that it is important that such businesses have access to the relevant Information to perform their functions. We will ensure that these businesses do not use your Information for other purposes. We may also receive Information from these businesses (e.g. updated delivery and address information), which we may use (e.g. to correct our records and deliver your next purchase). By using our Platform, you hereby freely and specifically consent to the transfer, storage, use, and disclosure of your Information among businesses who are affiliates of us and/or non-affiliated service providers, wherever located. These businesses shall be contractually bound to respect the confidentiality of your Information.
                            </p>

                            <p className="ml-6">
                                <strong>Marketing and Promotional Offers.</strong> We may also use your Information to provide you with information about goods and services which may be of interest to you and enhance your Platform experience, service messages, new features, enhancements, special offers, and events of interest. We may contact you via various channels, including without limitation emails, push notifications, web notifications, post, telephone, in-app messages, and news feed cards.
                            </p>

                            <p className="ml-6">
                                We may permit third parties to use your Information. For example, we may provide advertisers Information to help them reach the kind of audience they want to target and to enable us to comply with our commitments to our advertisers (e.g. by displaying their advertisements to a target audience).
                            </p>

                            <p className="ml-6">
                                Additionally, you may be asked to provide additional Information to participate in some of our market research activities, including competitions and promotions. For example, if you win a competition, you may be asked to provide further personal data to establish your eligibility and provide you with the prize. This Information may be collected by us or our co-sponsors or vendors for the promotion. Note that you should review such third parties’ privacy policies to see how they may use any information that they collect.
                            </p>

                            <p className="ml-6">
                                <strong>Business Transfers.</strong> In the event that we or substantially all of our assets are acquired, customer information will be one of the transferred assets.
                            </p>

                            <p className="ml-6">
                                <strong>Protection of Our Platform and Others.</strong> We release account and other Information when we believe such a release is appropriate to comply with the law and law enforcement investigations and to protect the rights, property or safety of our users or others. This includes exchanging information with other companies and organizations for various reasons, such as fraud protection and credit risk reduction.
                            </p>

                            <p className="mt-4">
                                Note that our Platform may, from time to time, contain links to and from the websites of our partner networks, advertisers, and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data or other information to these websites.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">HOW WE STORE YOUR INFORMATION</h2>
                            <p>
                                The Information that we collect from you may be transferred to, and stored at, a destination outside of Egypt. It may also be processed by staff operating outside Egypt who work for us or for one of our suppliers. Such staff may be engaged in, among other things, the fulfillment of your order, the processing of your payment details, and the provision of support services. We will store your Information for as long as necessary to fulfill the purposes indicated in this Privacy Policy or as otherwise permitted or required by law. Your Information may be transferred, stored, processed, and used by our affiliated companies and/or non-affiliated service providers in one or more countries outside your originating country. Your payment details may be transferred to and stored with our affiliated companies in order to, among other things, process your payment details and provide support services to you.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">WHAT SECURITY MEASURES WE APPLY</h2>
                            <p>
                                We maintain commercially reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy, and to protect against unauthorized access or alteration to, disclosure, or destruction of your Information. We may, for example, use encryption technology to secure your Information during transmission to our Platform as well as external firewall and on-host firewall technology to prevent network-level attacks. Only those authorized employees, contractors, and agents who need to know your Information in connection with the performance of their services are allowed to access this Information.
                            </p>

                            <p>
                                It is important for you to protect yourself against unauthorized access to your password and to your devices used to access our Services. You are responsible for keeping your password confidential. For example, ensure that you sign off when you have finished using a shared device.
                            </p>

                            <p>
                                Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your Information, we cannot guarantee the security of your Information transmitted to our Platform, and any transmission is at your own risk.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">HOW CAN YOU ACCESS AND AMEND YOUR INFORMATION?</h2>
                            <p>
                                You are able to access a broad range of information about your account and your interactions with the Platform for the purpose of viewing and, in certain cases, updating your Information.
                            </p>

                            <p>
                                Examples of information you can access easily at the Platform include:
                            </p>

                            <ul className="list-disc list-inside ml-6">
                                <li>Up-to-date information regarding recent orders;</li>
                                <li>Personally identifiable information (including name, e-mail, password, communications, and personalized advertising preferences);</li>
                                <li>Payment settings (including credit card information); and</li>
                                <li>E-mail notification settings.</li>
                            </ul>

                            <p>
                                You can opt-out of receiving future marketing communications from us at any time by adjusting your customer communication preferences, through the unsubscribe link within the email communication. For marketing via your mobile application, you will need to adjust your notifications settings in the general section of your mobile.
                            </p>

                            <p>
                                Also, our system will place cookies when you log on to our Platform, and this is to ensure you have an enjoyable user experience and are able to utilize all aspects of the Platform. You may disable Cookies by changing the settings on your browser. If you disable Cookies, it will affect how our Platform works, and you may not be able to access or use certain areas of our Platform or full functionality. For example, performance cookies collect information about how you use the Site, for instance, which pages you visit most often, which allows us to provide you with targeted and relevant choices that enhance your Site experience.
                            </p>

                            <p>
                                We may retain a copy of your Information for compliance reasons. When you update Information, we may retain a copy of the prior version for our records.
                            </p>

                            <h2 className="text-2xl font-bold mt-4">WHAT IF WE CHANGE OUR PRIVACY POLICY?</h2>
                            <p>
                                Our business changes constantly, and our Privacy Policy may therefore also need to change. We will post the current version of this Privacy Policy on the Platform, and each such change will be effective upon posting on the Platform or upon the date designated by us as the "effective date".
                            </p>

                            <p>
                                We may e-mail periodic reminders of our notices and conditions, but you should check our Platform frequently to see recent changes.
                            </p>

                            <p>
                                It is your obligation to regularly check the Privacy Policy. Your continued use of the Platform following any such change constitutes your agreement to this Privacy Policy as so modified.
                            </p>


                        </div>

                }
            </p>
        </div>
    )
}

export default Privacy
