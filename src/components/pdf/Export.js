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
            layout: 'noBorders',
        },

    ],
    pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        return currentNode.headlineLevel === 1 && currentNode.pageNumbers.length > 1;
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
        grandTotal: {
            bold: true,
            fontSize: 18,
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

const dataTable = data => {
    let body = []
    body.push([{ text: `${data.job.job_type.code} : ${data.job.name}`, style: 'tableHeader', alignment: 'left', colSpan: 3 }, {}, {}])
    body.push([{ text: 'Date', style: 'tableHeader', alignment: 'center', colSpan: 2 }, {}, { text: 'Workday', style: 'tableHeader', alignment: 'center' }])
    data.time_sheets.map((job, jkey) => {
        body.push([{ text: `${dateFormat(job.start_date)} - ${dateFormat(job.end_date)}`, style: '', colSpan: 2, alignment: 'center' }, {}, { text: job.day, style: '', alignment: 'center' }])
    })
    body.push([{ text: 'Total', style: 'tableHeader', alignment: 'center', colSpan: 2 }, {}, { text: sumday(data.time_sheets), style: '', alignment: 'center' }])
    return body
}

const conVTopdf = (data, monthfilter) => {
    document.content[1].table.body[0][1] = data.user.fullname
    document.content[1].table.body[0][3] = monthfilter.label
    document.content.splice(2)
    data.time_sheets.map((jobs, jkeys) => {
        document.content.push({
            table: {
                widths: [160, 160, 160],
                body: dataTable(jobs)
            },
            style: 'body',
            headlineLevel: 1
        })
    })
    document.content.push({
        table: {
            widths: [160, 160, 160],
            body: [[{ text: `Grand Total`, style: 'grandTotal', colSpan: 2, alignment: 'center' }, {}, { text: sumallday(data.time_sheets), style: 'grandTotal', alignment: 'center' }]]
        },
        style: 'body',
        headlineLevel: 1
    })
    document.content.push({
        text: [
            { text: 'Signature    ........................................................................\n', style: 'signature1' },
            { text: ' (................................................................)   ', style: 'signature2' }
        ],
        style: 'signature',
    })
}

export const exportPDF = (data, monthfilter) => {
    conVTopdf(data, monthfilter)
    pdfMake.createPdf(document).open();
}

