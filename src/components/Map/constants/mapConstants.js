export const types = {
    patients: {
        key: 'patients',
        text: 'نقشه‌ی شیوع کرونا',
        comment: 'زرد=مشکوک؛ قرمز=قطعی؛ تیره‌تر=بیمار بیشتر؛ منبع:وزارت بهداشت'
    },
    recent_patients: {
        key: "recent_patients",
        text: "مبتلایان جدید در هفته‌ی اول فروردین",
        comment: "بیماران ثبت‌شده در پورتال وزارت بهداشت",
    },
    patientTrack: {
        key: "patientTrack",
        text: "مناطق رفت‌وآمد مبتلایان کرونا",
        comment: "رنگ تیره‌تر = تردد بیشتر مبتلایان",
    },
    // testlabs: {
    //     key: "testlabs",
    //     text: "مراکز تشخیص کرونا",
    //     comment: "",
    // },
    // hospitals: {
    //     key: "hospitals",
    //     text: "مراکز درمانی ۱۶ ساعته کرونا",
    //     comment: "",
    // }
};

// data format:
// [
// 		[
// 			<zoomLevel number as key>
// 			0.0024,
// 			<polygons array as value>
// 			[
// 				{
// 					color1: ...
// 					matrix: [[[]]]
// 				},
// 				{
// 					color2: ...
// 					matrix: [[[]]]
// 				},
// 				...
// 			]
// 		],
// 		[
// 			...
// 		]
// ]