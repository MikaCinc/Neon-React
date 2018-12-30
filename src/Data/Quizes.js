const DefaultQuizes = [
    {
        ID: 1,
        Name: "Glavni gradovi",
        ShortDescription: "Da li znaš koji je glavni grad koje države?",
        Color: "#000",
        Tags: [],
        Questions: [
            {
                ID: 1,
                Text: "Srbija",
                Answers: [
                    {
                        Text: "Abu Dabi",
                        Correct: false
                    },
                    {
                        Text: "Sofija",
                        Correct: false
                    },
                    {
                        Text: "Beograd",
                        Correct: true
                    },
                    {
                        Text: "Berlin",
                        Correct: false
                    },
                ]
            }
        ]
    },
    {
        ID: 2,
        Name: "Građa ćelije",
        ShortDescription: "Šta je ćelija i od čega se sastoji?",
        Color: "#0f0",
        Tags: [],
        Questions: [
            {
                ID: 1,
                Text: "Koju ulogu imaju mitohondrije u ćeliji?",
                Answers: [
                    {
                        Text: "Prenos signala",
                        Correct: false
                    },
                    {
                        Text: "Deoba",
                        Correct: false
                    },
                    {
                        Text: "Komunikacija sa drugim ćelijama",
                        Correct: false
                    },
                    {
                        Text: "Ćelijsko disanje",
                        Correct: true
                    },
                ]
            }
        ]
    },
]

export default DefaultQuizes;