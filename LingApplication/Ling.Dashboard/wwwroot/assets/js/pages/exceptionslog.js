﻿$(document).ready(function () {
    $('#tblExceptions').dataTable();

    $('#chkLogs').on('click', function (event) {
        $("#chkErrors").prop('checked', false);
        $("#chkLogs").prop('checked', true);
        InitDataTable();
    });

    $('#chkErrors').on('click', function (event) {
        $("#chkLogs").prop('checked', false);
        $("#chkErrors").prop('checked', true);
        InitDataTable();
    });

    InitDataTable();
    $.fn.DataTable.ext.pager.numbers_length = 5;
});

// INITIALIZE DATA TABLE
function InitDataTable() {
    var logSelection = $('input[name="ExceptionLog"]:checked').val();
    var ajaxUrl = _contentRoot + 'ExceptionLog/GetExceptionsLogs';
    $('#tblExceptions').DataTable({
        "language": {
            "emptyTable": "No record found"
        },
        paging: true,
        filter: true,
        destroy: true,
        orderMulti: false,
        serverSide: true,
        columnDefs: [
            { "width": "10%", "targets": 0 },
            { "width": "20%", "targets": 1 },
            { "width": "20%", "targets": 2 },
            { "width": "15%", "targets": 3 },
            { "width": "15%", "targets": 4 },
            { "width": "2%", "targets": 5 }
        ],
        ajax: {
            type: "POST",
            url: ajaxUrl,
            data: { errorType: logSelection },
            dataType: "json"
        },
        aoColumns: [
            { mDataProp: "ID", "orderable": true },
            { mDataProp: "ClassName", "orderable": true },
            { mDataProp: "MethodName", "orderable": true },
            {
                mDataProp: "ErrorTypeCode", "orderable": true
            },
            {
                mDataProp: "CreatedDate",
                render: function (d) {
                    return moment(d).format("MM/DD/YYYY");
                },
                "orderable": true
            },
            {
                mDataProp: "ID",
                render: function (d) {
                    var viewUrl = "ShowExceptionLogModalByID(" + d + ");";
                    var deleteUrl = "ShowGlobalConfirmDeleteModal('" + _contentRoot + "ExceptionLog/Delete/" + d + "')";
                    return '<div class="dropdown text-sans-serif"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal custom-btn-reveal mr-3" type="button" id="dropdown' + d + '" data-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fa fa-ellipsis-h fs--1"></span></button>' +
                        '<div class="dropdown-menu dropdown-menu-right border py-0" aria-labelledby="dropdown' + d + '">' +
                        '<div class="bg-white py-2"><a class="dropdown-item" href="javascript:void(0);" onclick=\"' + viewUrl + '\" >View</a>' +
                        '<div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="javascript:void(0);" onclick=\"' + deleteUrl + '\">Delete</a>' +
                        '</div></div></div>';
                },
                "orderable": false
            }
        ],
        select: true,
        "drawCallback": function (settings) {
            $('[data-toggle="b-tooltip"]').tooltip({
                container: 'body'
            });

            $(".dataTables_paginate .pagination").addClass('pagination-sm');
        }
    });
}

function ShowExceptionLogModalByID(id) {
    if (id > 0) {
        var ajaxUrl = _contentRoot + 'ExceptionLog/SelectExceptionMessageByID';
        $.ajax({
            type: "POST",
            url: ajaxUrl,
            data: { id: id },
            success: function (response) {
                $("#viewExceptionDetailModal").modal("show");
                if (response != null && response.resultCode == "SUCCESS") {
                    $('#dvExceptionMessage').html("<b>Message : </b>" + response.resultObject.errorMessage);
                    $('#dvStackTrace').hide();
                    if (response.resultObject.stackTrace.length > 0) {
                        $('#dvStackTrace').html(response.resultObject.stackTrace).show();
                    }
                }
            },
            error: function (x, e) {
                $("#viewExceptionDetailModal").modal("hide");
            }
        });
    }
}
