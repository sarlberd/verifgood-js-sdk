//DateRangeShortcutmixins

import Moment from 'moment';
export default {
    data: function(){
        return {
            DateRangeShortcutmixins_dateShortcutSelected:'',
        };
    },
    methods:{
        
        DateRangeShortcutmixins_useRangeDate: function(input){
            
            var shortcut = this.DateRangeShortcutmixins_dateShortcutSelected;
            if( shortcut == 'Aujourd\'hui' ){
                // //console.log(Moment().format() );
                input.value = [ Moment().subtract(1, 'days'), Moment().add(1, 'days') ];
            }else if(shortcut == 'Hier'){
                input.value = [ Moment().subtract(2, 'days'), Moment().subtract(1, 'days') ];
            }else if(shortcut == 'Cette semaine'){
                input.value = [ Moment().startOf('week'), Moment().add(1, 'days') ];
            }else if(shortcut == 'La semaine derniere'){
                input.value = [ Moment().subtract('1', 'week').day(0) , Moment().subtract('1', 'week').day(6) ];
            }
            else if(shortcut == 'Le mois dernier'){
                input.value = [ Moment().subtract('1', 'month').startOf('month') , Moment().subtract('1', 'month').endOf('month') ];
            }
            else if(shortcut == 'les 7 derniers jours'){
                input.value = [ Moment().subtract(7, 'days'), Moment().add(1, 'days') ];
            }
            else if(shortcut == 'les 30 derniers jours'){
                input.value = [ Moment().subtract(30, 'days'), Moment().add(1, 'days') ];
            }else if(shortcut == 'Choisir une plage de date'){
                var that = this;
                this.$nextTick(function () {
                  // DOM updated
                    that.toggleAutoFocusonDatePickerRange();
                });
                //this.$forceUpdate();
            }else{
                input.value = null;
            }
            //this.$store.dispatch( 'refreshField', option );
        },
        DateRangeShortcutmixins_LogicComparatorDateRange:function(){
            return {
                filter:'date',
                filterParams:{

                    // provide comparator function
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        
                        return ;
                        var dateWithoutTime = cellValue.split('T');
                        filterLocalDateAtMidnight = Moment(filterLocalDateAtMidnight).format('YYYY-MM-DD');
                        var dateParts  = dateWithoutTime[0].split("-");
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(cellValue);
                        if (Moment(cellDate).unix() < Moment(filterLocalDateAtMidnight).unix()) {
                            return -1;
                        } else if (Moment(cellDate).unix()  > Moment(filterLocalDateAtMidnight).unix()) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            };
        },
        DateRangeShortcutmixins_isInRange: function(startDate,currentDate,endDate){
            if(!currentDate)return;
            return Moment(startDate).unix() < Moment(currentDate).unix() &&  Moment(currentDate).unix() < Moment(endDate).unix();
        },
        DateRangeShortcutmixins_addLogicComparatorOnGridDefinitionColumn: function(columnDef){
            Object.assign(columnDef,{
                filter:'date',
                filterParams:{
                    // provide comparator function
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        //// //console.log("COMPARATOR", filterLocalDateAtMidnight, cellValue);
                        if(!cellValue || cellValue == "")return;
                        //var dateWithoutTime = cellValue.split('T');
                        var filter = Moment(filterLocalDateAtMidnight).format('YYYY-MM-DD');
						//// //console.log("FILTER LOCAL DATE", filterLocalDateAtMidnight, cellValue);
						var value = Moment(cellValue).format("YYYY-MM-DD");
						//// //console.log("FILTER LOCAL DATE", filterLocalDateAtMidnight, value, filterLocalDateAtMidnight<value);
						if(value<filter) return -1;
						else if (value>filter) return 1;
						else return 0;
                        /*var dateParts  = dateWithoutTime[0].split("-");
                        var day = Number(dateParts[2]);
                        var month = Number(dateParts[1]) - 1;
                        var year = Number(dateParts[0]);
                        var cellDate = new Date(cellValue);
                        if (Moment(cellDate).unix() < Moment(filterLocalDateAtMidnight).unix()) {
                            return -1;
                        } else if (Moment(cellDate).unix()  > Moment(filterLocalDateAtMidnight).unix()) {
                            return 1;
                        } else {
                            return 0;
                        }*/
                    }
                }
            });
        }
    }
}
