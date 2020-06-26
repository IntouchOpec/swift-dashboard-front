import moment from 'moment'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
    THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
}

const dateFormat = (date) => {
    return moment(date).format("MMM-DD-YYYY")
}

const sumday = timesheet => {
    let sum = 0
    timesheet.map((job) => {
        sum += job.day
    })
    return sum
}

const sumallday = timesheet => {
    let sum = 0
    timesheet.map((jobs) => {
        sum += sumday(jobs.time_sheets)
    })
    return sum
}

var document = {
    pageSize: 'A4',
    footer: function (currentPage, pageCount) { return [{ text: currentPage.toString() + ' of ' + pageCount, style: 'footer' }] },
    content: [
        {
            text: 'Report',
            style: 'header'
        },
        {
            table: {
                body: [
                    ['Staff Name : ', '', 'Month : ', '']
                ]
            },
            style: 'subtitle',
            layout: 'noBorders'
        },
        {
            table: {
                widths: [160, 160, 160],
                body: [
                ]
            },
            style: 'body',
        },
        {
            text: [
                { text: 'Signature    ........................................................................\n', style: 'signature1' },
                { text: ' (................................................................)   ', style: 'signature2' }
            ],
            style: 'signature',
        },
    ],
    pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
    },
    defaultStyle: {
        font: 'THSarabunNew'
    },
    styles: {
        header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'center'
        },
        body: {
            fontSize: 18,
        },
        tableHeader: {
            bold: true,
            fontSize: 16,
            color: 'black'
        },
        subtitle: {
            bold: true,
            fontSize: 20,
            color: 'black'
        },
        signature: {
            bold: true,
            fontSize: 18,
            color: 'black',
            margin: [0, 50, 40, 0],
            alignment: 'right',
        },
        signature1: {
            bold: true,
            fontSize: 18,
            color: 'black',
            margin: [0, 10, 20, 0],
            alignment: 'right',
        },
        signature2: {
            bold: true,
            fontSize: 18,
            color: 'black',
            margin: [0, 0, 40, 0],
            alignment: 'right',
        },
        footer: {
            fontSize: 16,
            color: 'black',
            alignment: 'center',
        }
    },
};

const conVTopdf = (data, monthfilter) => {
    document.content[1].table.body[0][1] = data.user.fullname
    document.content[1].table.body[0][3] = monthfilter.label
    document.content[2].table.body = []
    data.time_sheets.map((jobs, jkeys) => {
        document.content[2].table.body.push([{ text: `${jobs.job.job_type.code} : ${jobs.job.name}`, headlineLevel: 0, style: 'tableHeader', alignment: 'left', colSpan: 3 }, {}, {}])
        document.content[2].table.body.push([{ text: 'Date', style: 'tableHeader', alignment: 'center', colSpan: 2 }, {}, { text: 'Workday', style: 'tableHeader', alignment: 'center' }])
        jobs.time_sheets.map((job, tkey) => {
            document.content[2].table.body.push([{ text: `${dateFormat(job.start_date)} - ${dateFormat(job.end_date)}`, style: '', colSpan: 2, alignment: 'center' }, {}, { text: job.day, style: '', alignment: 'center' }])
        })
        document.content[2].table.body.push([{ text: 'Total', style: 'tableHeader', alignment: 'center', colSpan: 2 }, {}, { text: sumday(jobs.time_sheets), style: '', alignment: 'center' }])
    })
}

export const exportPDF = (data, monthfilter) => {
    conVTopdf(data, monthfilter)
    console.log(document)
    pdfMake.createPdf(document).open();
}

