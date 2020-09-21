var originalSelectedRowNumber = 1;
var movieList = [];
var searchList = [];
var idList = [];
var currentPageNum = 1;
var totalPagesNum = 0;

$(document).ready(function () {
    getMovieList();
});

function getMovieList() {
    $.ajax({
        async: false,
        url: "http://localhost:8080/scoreSheet/movies",
        type: "GET",
        success: function (data) {
            var numOfMovies = data.length;
            var numOfPages = Math.ceil(numOfMovies / 10); //Math.ceil() -> 向上取整數
            totalPagesNum = numOfPages;

            for (var i = 0; i < numOfMovies; i++) {
                movieList[i] = data[i];
                idList[i] = data[i].id;
            }

            createPages(numOfMovies);
            createPagination(numOfPages);
        },
        error: function () {
        }
    })
}

function createPages(len) {
    let container = $("#tableContainer");
    var tbody;
    var tbodyStr = "";
    var numOfPages = 1;
    var id = 0;
    var name = "";
    var info = "";
    var score = 0;

    for (var i = 0; i < len; i++) {
        if ((i % 10) === 0) {
            container.append(
                '<table id="table' + numOfPages + '" class="table table-hover" style="display: none">' +
                '<thead>' +
                '<tr>' +
                '<th style="width: 10%">編號</th>' +
                '<th style="width: 30%">電影名稱</th>' +
                '<th style="width: 50%">簡介</th>' +
                '<th style="width: 10%">評分</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody></tbody>' +
                '</table>'
            );
            tbodyStr ="#table" + numOfPages; + " tbody";
            tbody = $(tbodyStr);
            numOfPages++;
        }

        id = idList[i];
        name = movieList[i].name;
        info = movieList[i].info;
        score = movieList[i].score;
        tbody.append(
            "<tr id='row" + id + "' onclick='select(\"row\", " + id + ")'>" +
            "<td>" + id + "</td>" +
            "<td>" + name + "</td>" +
            "<td>" + info + "</td>" +
            "<td>" + score + "</td>" +
            "</tr>"
        );
    }

    $("#table1").attr("style", "display: block");
}

function createPagination(len) {
    $("#totalPages").html(len);

    let paginationUl = $("#paginationUl");
    paginationUl.append(
        '<li id="preLi" class="page-item disabled"><a href="#" onclick="previousPage()">Previous</a></li>' +
        '<li id="p1li" class="page-item active"><a href="#" class="page-link" onclick="changePage(1)">1</a></li>'
    );
    for (var i = 2; i <= len; i++) {
        paginationUl.append('<li id="p' + i + 'li" class="page-item"><a href="#" class="page-link" onclick="changePage(' + i + ')">' + i + '</a></li>');
    }

    if (len === 1) {
        paginationUl.append('<li id="nextLi" class="page-item disabled"><a href="#" class="page-link" onclick="nextPage()">Next</a></li>');
    } else {
        paginationUl.append('<li id="nextLi" class="page-item"><a href="#" class="page-link" onclick="nextPage()">Next</a></li>');
    }
    
}

function previousPage() {
    if (currentPageNum > 1) {
        changePage(currentPageNum-1);
    }
}

function nextPage() {
    if (currentPageNum < totalPagesNum) {
        changePage(currentPageNum+1);
    }
}

function changePage(num) {
    let oriPagination = "#p" + currentPageNum + "li";
    let oriPage = "#table" + currentPageNum;
    $(oriPagination).attr("class", "page-item");
    $(oriPage).attr("style", "display: none");

    let curPagination = "#p" + num + "li";
    let curPage = "#table" + num;
    $(curPagination).attr("class", "page-item active");
    $(curPage).attr("style", "display: block");

    currentPageNum = num;
    $("#whichPage").html(currentPageNum);

    if (currentPageNum === 1) {
        $("#preLi").attr("class", "page-item disabled");
    } else {
        $("#preLi").attr("class", "page-item");
    }
    
    if (currentPageNum === totalPagesNum) {
        $("#nextLi").attr("class", "page-item disabled");
    } else {
        $("#nextLi").attr("class", "page-item");
    }
}

function addMovie() {
    var param = {};
    param['id'] = $('#addEmployeeModal input[name=id]').val();
    param['name'] = $('#addEmployeeModal input[name=name]').val();
    param['info'] = $('#addEmployeeModal textarea[name=info]').val();
    param['score'] = $('#addEmployeeModal input[name=score]').val();

    $.ajax({
        async: false,
        url: "http://localhost:8080/scoreSheet/movies",
        type: "POST",
        data: param,
        success: function (data) {
            location.reload();
        },
        error: function () {
        }
    })
}

function editMovie() {
    var param = {};
    param['id'] = $('#editEmployeeModal input[name=id]').val();
    param['name'] = $('#editEmployeeModal input[name=name]').val();
    param['info'] = $('#editEmployeeModal textarea[name=info]').val();
    param['score'] = $('#editEmployeeModal input[name=score]').val();

    $.ajax({
        async: false,
        url: "http://localhost:8080/scoreSheet/movies",
        type: "PUT",
        data: param,
        success: function (data) {
            location.reload();
        },
        error: function () {
        }
    })
}

function deleteMovie() {
    let id = { "id": originalSelectedRowNumber };
    $.ajax({
        async: false,
        url: "http://localhost:8080/scoreSheet/movies",
        type: "DELETE",
        data: id,
        success: function (data) {
            location.reload();
        },
        error: function () {
        }
    })
}

function select(prefix, id) {
    // 讓修改、刪除button可使用
    $("#editBtn").attr("disabled", false);
    $("#deleteBtn").attr("disabled", false);
    $("#seditBtn").attr("disabled", false);
    $("#sdeleteBtn").attr("disabled", false);

    var originalId = prefix + originalSelectedRowNumber;
    var originalSelectedRow = document.getElementById(originalId);
    originalSelectedRow.removeAttribute("class");

    var selectedId = prefix + id;
    var currentSelectedRow = document.getElementById(selectedId)
    currentSelectedRow.setAttribute("class", "selectedRow");
    originalSelectedRowNumber = id;
}

function setEditInput() {
    var index = idList.indexOf(originalSelectedRowNumber);
    var movie = movieList[index];

    $('#editEmployeeModal input[name=id]').val(movie.id);
    $('#editEmployeeModal input[name=name]').val(movie.name);
    $('#editEmployeeModal textarea[name=info]').val(movie.info);
    $('#editEmployeeModal input[name=score]').val(movie.score);
}

function searchKeyword() {
    var str = $("#searchTxt").val();
    var param = { "keyword": str };

    if (str != "") {
        $.ajax({
            async: false,
            url: "http://localhost:8080/scoreSheet/movies/search",
            type: "POST",
            data: param,
            success: function (data) {
                if (data.length > 0) {
                    $("#mainDiv").toggle();
                    $("#searchResultDiv").toggle();

                    movieList = [];
                    idList = [];

                    let container = $("#searchResultBody");
                    let id, name, info, score;

                    for (let i = 0; i < data.length; i++) {
                        movieList[i] = data[i];
                        idList[i] = data[i].id;

                        id = data[i].id;
                        name = data[i].name;
                        info = data[i].info;
                        score = data[i].score;

                        container.append(
                            "<tr id='srow" + id + "' onclick='select(\"srow\", " + id + ")'>" +
                            "<td>" + id + "</td>" +
                            "<td>" + name + "</td>" +
                            "<td>" + info + "</td>" +
                            "<td>" + score + "</td>" +
                            "</tr>"
                        );
                    }

                    originalSelectedRowNumber = idList[0];
                    $("#searchTxt").val("");
                } else {
                    alert("查無結果!");
                }
            },
            error: function () {
            }
        })
    }
}

function goBack() {
    location.reload();
}