export const FLYT_DESCRIPTION_EN = "Fint Flyt is an integration platform developed to simplify and reduce the number of integrations between systems. " +
    "The need for transferring data between systems in county municipalities is increasing in line with the digitization of the public sector. To meet this need effectively, the idea of Fint Flyt was born. \n" +
    "County municipalities currently process large amounts of data, including applications, permits, referrals, consents, reports, etc. In most cases, this data needs to be transferred to other systems such as various archive systems or financial systems for invoicing and payment. County municipalities use a wide range of systems that may not necessarily \"speak the same language\".";

export const FAQ_EN: { header: string, content: string }[] = [
    {
        header: "How do I use metadata?",
        content: "Metadata can be used in all custom fields. In outgoing data, it's all the text fields, and additionally, the dropdown menus where you can select 'dynamic value.' This allows the user to build titles, personal information, or other fields with information from submitted data."
    },
    {
        header: "What do the symbols mean when I use metadata?",
        content: "The custom fields allow both free text and using data from the form. For a computer to distinguish free text from metadata, metadata appears in this format: '$if{metadata-id}'. This way, the system can recognize these references and replace the content with data from the submitted instance. Therefore, it's important to maintain the format of metadata references when editing or adding free text in a custom field."
    },
    {
        header: "What is value conversion, and how do I use it?",
        content: "Value conversion is a field that allows you to use a defined rule to convert each occurrence of a value. Value conversions are set up in the value conversion menu and used similarly to metadata. Drag in the value conversion you want to use, followed by the value to be converted."
    },
    {
        header: "Why can't Flyt provide an error message when I set up a configuration with a combination of code values that the destination doesn't allow?",
        content: "Flyt will only have the ability to transform data based on rules set up in the configuration. Flyt isn't connected to the destination with information about what is accepted/not accepted. Flyt receives data, transforms it according to the given configuration, and forwards it. If the destination rejects the submission, an error message will be displayed in the instance overview."
    }
]