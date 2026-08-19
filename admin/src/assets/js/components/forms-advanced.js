



function initAdvancedForms() {
  // Initialize Tom Select
  const selectSingle = document.getElementById('select-single');
  if (selectSingle) {
    new TomSelect(selectSingle, {
      create: true,
      sortField: {
        field: "text",
        direction: "asc"
      }
    });
  }

  const selectMultiple = document.getElementById('select-multiple');
  if (selectMultiple) {
    new TomSelect(selectMultiple, {
      plugins: ['remove_button'],
      create: true
    });
  }
  
  const selectGroups = document.getElementById('select-groups');
  if (selectGroups) {
    new TomSelect(selectGroups, {
      create: false
    });
  }

  const selectRich = document.getElementById('select-rich');
  if (selectRich) {
    new TomSelect(selectRich, {
      valueField: 'value',
      labelField: 'text',
      searchField: ['text', 'email'],
      render: {
        option: function(data, escape) {
          return '<div class="d-flex align-items-center py-1">' +
            '<img class="rounded-circle me-2" src="' + escape(data.src) + '" width="30" height="30" alt="">' +
            '<div>' +
              '<div class="fw-bold fs-14">' + escape(data.text) + '</div>' +
              '<div class="text-muted small">' + escape(data.email) + '</div>' +
            '</div>' +
          '</div>';
        },
        item: function(data, escape) {
          return '<div class="d-flex align-items-center" title="' + escape(data.email) + '">' +
            '<img class="rounded-circle me-2" src="' + escape(data.src) + '" width="20" height="20" alt="">' +
            '<span>' + escape(data.text) + '</span>' +
          '</div>';
        }
      }
    });
  }

  const selectClearable = document.getElementById('select-clearable');
  if (selectClearable) {
    new TomSelect(selectClearable, {
      plugins: ['clear_button'],
      create: false
    });
  }

  // Initialize Flatpickr
  const dateBasic = document.getElementById('date-basic');
  if (dateBasic) {
    flatpickr(dateBasic, {});
  }

  const dateTime = document.getElementById('date-time');
  if (dateTime) {
    flatpickr(dateTime, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
    });
  }

  const dateRange = document.getElementById('date-range');
  if (dateRange) {
    flatpickr(dateRange, {
      mode: "range"
    });
  }
  
  const dateMultiple = document.getElementById('date-multiple');
  if (dateMultiple) {
    flatpickr(dateMultiple, {
      mode: "multiple",
      dateFormat: "Y-m-d"
    });
  }
  
  const dateInline = document.getElementById('date-inline');
  if (dateInline) {
    flatpickr(dateInline, {
      inline: true
    });
  }

  const dateRestricted = document.getElementById('date-restricted');
  if (dateRestricted) {
    flatpickr(dateRestricted, {
      minDate: "today",
      disable: [
        function(date) {
          // return true to disable
          return (date.getDay() === 0 || date.getDay() === 6); // Disable weekends
        }
      ]
    });
  }

  const dateHuman = document.getElementById('date-human');
  if (dateHuman) {
    flatpickr(dateHuman, {
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
    });
  }

  // Initialize IMask
  const maskPhone = document.getElementById('mask-phone');
  if (maskPhone) {
    IMask(maskPhone, {
      mask: '(000) 000-0000'
    });
  }

  const maskDate = document.getElementById('mask-date');
  if (maskDate) {
    IMask(maskDate, {
      mask: Date,
      pattern: 'Y-`m-`d',
      blocks: {
        Y: { mask: IMask.MaskedRange, from: 1900, to: 9999 },
        m: { mask: IMask.MaskedRange, from: 1, to: 12 },
        d: { mask: IMask.MaskedRange, from: 1, to: 31 }
      },
      format: function (date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;
        return [year, month, day].join('-');
      },
      parse: function (str) {
        const yearMonthDay = str.split('-');
        return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]);
      }
    });
  }

  const maskCurrency = document.getElementById('mask-currency');
  if (maskCurrency) {
    IMask(maskCurrency, {
      mask: '$num',
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ' '
        }
      }
    });
  }
  
  const maskCard = document.getElementById('mask-card');
  if (maskCard) {
    IMask(maskCard, {
      mask: '0000 0000 0000 0000'
    });
  }

  const maskIp = document.getElementById('mask-ip');
  if (maskIp) {
    IMask(maskIp, {
      mask: '0[0][0].0[0][0].0[0][0].0[0][0]'
    });
  }

  const maskDynamic = document.getElementById('mask-dynamic');
  if (maskDynamic) {
    IMask(maskDynamic, {
      mask: [
        {
          mask: '(000) 000-0000'
        },
        {
          mask: '00000'
        }
      ]
    });
  }
}
