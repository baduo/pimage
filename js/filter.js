/**
 * 要写明哪里设定默认的menu
 */

gui_filter =
{
    mk: function()
    {
        if(!gui_filter.filterOpCF)
        {
            gui_filter.filterOpCFObject();
        }
        var menutitle = [], j = 0;
        for(var i in gui_filter.r)
        {
            menutitle[j++] = i;
        }
        var z = '';
        z = gui.menu.build('fi',menutitle)
        + '<div id="fi" class=squares></div>'
        + gui.Y.kontrol('fi',65) // 第二个参数是top
		//这个div很重要 通过margin来设定后面内容的偏移
        + ' <div style="background: #555; height: 1px; margin: 100px 0 2px; "></div>'
        + '<div id="filter_placeholder"><div>';
        $C('MM','filter')[0].innerHTML = '<div class=z>' + z + '</div>';
        gui_filter.reset();
    },

    current: function(o)
    {
        var b = gui_filter.fileNumber;
        gui_filter.fileNumber = o.id.substr(2);
        if($('fi'+b))
        {
            gui_filter.preview(b);
            $('fi'+b).className = '';
        }
        $('fi'+ gui_filter.fileNumber).className = 'cur';
        vars.cache(1);
    }   ,

    uri: function(v)
    {
        return 'media/glyph/' + vars.filter + '/' + (filter.fileNumber -1) + '-' + v + '.png';
    },
    preview: function(i,m)
    {
        if($('fi'+ i) && gui_filter.src[i].src)
        {
            function O(n)
            {
                return (n < 34 ? (34-n)/2: 0);
            }
            function Z(n)
            {
                o = {
                    W: (34/n) * o.W,
                    H: (34/n) * o.H
                };
            }
            var c = $2D('fi' + i),
                d = gui_filter.src[i],
                o = {
                    W:d.width,
                    H:d.height
                };
            if(o.W >= o.H) Z(o.W);
            else if(o.H > o.W) Z(o.H);
            c.clearRect(0,0,34,34);
            c.drawImage(d, O(o.W), O(o.H), o.W, o.H);
        }
    },
    reset: function()
    {
        var o = gui.Y;
        r = o.r.fi;
        if(!gui_filter.fileNumber) gui_filter.fileNumber = 1;
        var a = parseInt(gui_filter.fileNumber),
            b = gui_filter.r[vars.fi],
            i = r.n() - r.display,
            n = (a/b <= 0.5)? -1 : 2;
        o.prev.fi = null;
        o.cur.fi = Math.max(1, Math.min(i, Math.floor(((a + n) / b) * i)));
        o.id = 'fi';
        // 这个函数里加载每个图片 放到canvas里面
        o.fi();
        o.kontrol_update(o.id);
//        gui_filter.buildfilterOp('blur',1);
    },
    // 调用gui.X.build 构建具体每个滤镜的参数
    buildfilterOp: function(menuname,imgid)
    {
        vars['imgid']= imgid;
        var filtername = gui_filter.filterNameDic[menuname][imgid];
        var r = gui_filter.filterOpCF[filtername],
        z = '';
        for(var i in r.vars)
        {
            if(!vars[i])
            {
                var b = r.vars[i];
                vars[i] = b;
            }
        }
        for(var i in r.build)
        {
            i = r.build[i];
            var o = i.indexOf('_')!= -1? i.substr(0, i.indexOf('_')):i;
            var title = o.replace('_',' ').toLowerCase();
            var fu = (i== 'br')? '<br>' : gui[cF[i].type].build(title, i ,cF[i].val,'h');
            z += fu;
        }
        z += '<input type=button style="float:left; margin-left: 20px" value="ok" onclick="gui_filter.filterok();return false;">'
          + '<input type=button style="float:right; margin-right: 30px" value="cancel" onclick="gui_filter.filtercancel();return false;">' ;

        var o = $('filter_placeholder').innerHTML = z;
		$C('TML','filter')[0].innerHTML = 'filter  -  '+filtername;
		
        gui_filter.resize(r.size);
        if(r.build.length ==0 || r.run)
        {
            hooker.fi();
        }

    },

    resize:function (n) { // resize "OPTIONS" window
            function fu(o) {
                o.style.height = n + "px";
            }

            ;
            var o = $('filter'),
                l = $C('ML', o)[0],
                m = $C('MM', o)[0],
                r = $C('MR', o)[0];
            fu(l);
            fu(r);
            fu(m);
            $S('filter').height = (n + 40) + 'px';
            win.r['filter'][3] = n + 40;
    },
    filterok:function(){
        var ctx_temp = $2D('ctx_temp');
        co.copy('ctx_temp', 'ctx_box');
        ctx_temp.clearRect(0, 0, canvas.W, canvas.H);
		var name = $C('TML','filter')[0].innerHTML.split('-');
			var n = 'filter';
			if(name && name[1]) n = name[1].trim();
            canvas.history_set('NaN','',[n,'Filter']);
//        canvas.history_set();
        if (marquee.ghost) {
            marquee.run();
            ctx_temp.restore();
        }
        moved = false;
    },
    filtercancel:function (){
        var ctx_filter = $2D('ctx_filter');
        ctx_filter.clearRect(0, 0, canvas.W, canvas.H);
        $2D('ctx_temp').clearRect(0, 0, canvas.W, canvas.H);
    },

    src: [],
    r:
        {
            'blur': 6,
            'color':8,
            'edge' : 2,
            'transform':10,
            'stylize':7
        },
    // 页面上都是 menu 以及编好号的图片，这个对象用来将menu+图片编号转化为具体的滤镜名称。，
    filterNameDic:
    {
        blur:
        {
            '1': 'basicblur',
            '2': 'gaussblur',
            '3': 'highpass',
            '4': 'lensblur' ,
            '5': 'glow',
            '6': 'unsharp'
        },
        color:
        {
            '1': 'adjustHSB',
            '2': 'adjustRGB',
            '3': 'contrast',
            '4': 'exposure' ,
            '5': 'gain',
            '6': 'gamma',
            '7': 'invert',
			'8': 'gray'
        },
        edge:
        {
            '1': 'detectEdge',
//            '2': 'dog',
            '2': 'laplace'
//            '3': 'edge_test3',
//            '4': 'edge_test4'
        },
        transform:{
            '1':'mosaic',
            '2':'sphere',
            '3':'diffuse',
            '4':'displace',
            '5':'kaleido',
            '6':'marble',
            '7':'pinch' ,
            '8':'polar',
            '9':'circle',
            '10':'twirl'
        },
        stylize:{
            '1':'addnoise',
            '2':'contour',
            '3':'dissolve',
            '4':'emboss',
            '5':'sparkle',
            '6':'threshold',
			'7':'grayout'
        }

    },
    //具体的某个滤镜 有哪些op
    'filterOpCFObject': function(){
        //命名规则 参数名称_滤镜名称
        //滤镜名称： 滤镜名菜单分类 目前只有color blur edge
        cF['Block_mosaic'] = {type:'X',val:[0,100,100]},
        cF['x-Radius_basicblur'] ={type: 'X',val: [0,30,100]} ,
        cF['y-Radius_basicblur'] = {type: 'X', val: [0,30,100]},
        cF['Itertations_basicblur']={type: 'X', val :[0,10]},
        cF['Premultiply_basicblur'] = { type : 'check',val : ["Premultiply_basicblur", 'true', 'false']},
        //gussblur
        cF['Radius_gaussblur'] = {type : 'X', val:[0,40,40]},
        cF['Premultiply_gaussblur'] = {type : 'check', val :["Premultiply_gaussblur", 'true', 'false']},

        cF['Radius_highpass'] = {type : 'X', val :[0,100,100]},
        cF['Radius_glow'] = {type : 'X', val :[0,100,100]},
        cF['Amount_glow'] = {type : 'X', val :[0,100,100]},
        cF['Radius_unsharp'] = {type : 'X', val :[0,100,100]},
        cF['Amount_unsharp'] = {type : 'X', val :[0,100,100]},
        cF['Threshold_unsharp'] = {type : 'X', val :[0,255,100]},
        //lensblur
        cF['Radius_lensblur'] = {type : 'X',val:[0,50,50] },
        cF['Sides_lensblur'] ={ type: 'X', val: [3,12,12]},
        cF['Bloom_lensblur'] = {type: 'X',val:[1,8]},
        cF['Bloom-Threshold_lensblur'] ={type:'X',val:[0,255]},
        //color

        cF['R_adjustRGB'] = {type: 'X',val:[-1,2,1,'float',1]},
        cF['G_adjustRGB'] = {type: 'X',val:[-1,2,1,'float',1]},
        cF['B_adjustRGB'] = {type: 'X',val:[-1,2,1,'float',1]},

        cF['H_adjustHSB'] = {type:'X',val:[-1,2,1,'float',1]},
        cF['S_adjustHSB'] = {type:'X',val: [-1,2,1,'float',1]},
        cF['B_adjustHSB'] = {type:'X',val: [-1,2,1,'float',1]},

        cF['Bright_contrast'] ={type:'X',val:[0,2,2,'float']};
        cF['Contrast_contrast'] = {type:'X',val:[0,2,2,'float']},
		cF['scale_exposure'] = {type:'X',val:[0,5,5,'float']},
		cF['gain_gain'] = {type:'X',val:[0,1,1,'float']},
		cF['bias_gain'] = {type:'X',val:[0,1,1,'float']},
			//gamma
		cF['R_gamma'] = {type:'X',val:[0,3,3,'float']},
		cF['G_gamma'] = {type:'X',val:[0,3,3,'float']},
		cF['B_gamma'] = {type:'X',val:[0,3,3,'float']},


        //edge
        cF['r1_dog'] = {type: 'X',val:[-1,1]},
        cF['r2_dog'] = {type:'X',val: [-1,1]},
        cF['normal_dog'] = {type: 'check',val : ["normal_dog", 'true', 'false']},
        cF['invert_dog'] = {type: 'check',val : ["invert_dog", 'true', 'false']},
        //distort
        cF['blocksize_mosaic'] = {type:'X',val:[1,100,100]},
        //custom
        cF['amount_addnoise'] ={type:'X',val:[0,100,100]},
        cF['density_addnoise'] ={type:'X',val:[0,100,100]},
        cF['mono_addnoise'] ={type:'check',val:['mono_addnoise','true','false']},

        cF['level_contour']={type:'X',val:[0,30,30]},
        cF['Offset_contour']={type:'X',val:[0,100,100]},
        cF['scale_contour']={type:'X',val:[0,1,1,'float']},
        cF['density_dissolve']={type:'X',val:[0,100,100]},
        cF['softness_dissolve']={type:'X',val:[0,100,100]},

        cF['angle_emboss']={type:'X',val:[0,360,360]},
        cF['intensity_emboss']={type:'X',val:[0,90,90]},
        cF['height_emboss']={type:'X',val:[0,100,100]},
        cF['texture_emboss'] = {type: 'check',val : ["texture_emboss", 'true', 'false']},

        cF['rays_sparkle'] = {type:'X',val:[0,300,300]},
        cF['radius_sparkle'] = {type:'X',val:[0,300,300]},
        cF['amount_sparkle'] = {type:'X',val:[0,100,100]},
        cF['centre-X_sparkle'] = {type:'X',val:[0,100,100]},
        cF['centre-Y_sparkle'] = {type:'X',val:[0,100,100]},
        cF['random_sparkle'] = {type:'X',val:[0,100,100]},

        cF['lower_threshold']={type:'X',val:[0,255,255]},
        cF['upper_threshold']={type:'X',val:[0,255,255]},

        cF['centre-X_rays']={type:'X',val:[0,100,100]},
        cF['centre-Y_rays']={type:'X',val:[0,100,100]},
        cF['angle_rays']={type:'X',val:[0,360,360]},
        cF['distance_rays']={type:'X',val:[0,200,200]},
        cF['rotation_rays']={type:'X',val:[0,360,360]},
        cF['zoom_rays']={type:'X',val:[0,2,2,'float']},
        cF['opacity_rays']={type:'X',val:[0,100,100]},
        cF['strength_rays']={type:'X',val:[0,5,5,'float']},
        cF['threshold_rays']={type:'X',val:[0,100,100]},
        cF['rays-only_rays']={type: 'check',val : ["rays-only_rays", 'true', 'false']},

        cF['centre-X_circle']={type:'X',val:[0,100,100]},
        cF['centre-Y_circle']={type:'X',val:[0,100,100]},
        cF['radius_circle']={type:'X',val:[0,100,100]},
        cF['height_circle']={type:'X',val:[0,400,400]},
        cF['angle_circle']={type:'X',val:[0,360,360]},
        cF['spread_circle']={type:'X',val:[0,3600,3600]},
        cF['edge_circle'] ={type:'radio',val:['edge_circle','none','clamp','wrap']},

        cF['scale_diffuse'] ={type:'X',val:[1,100,100]},
        cF['edge_diffuse'] ={type:'radio',val:['edge_diffuse','none','clamp','wrap']},

        cF['amount_displace'] ={type:'X',val:[0,1,1,'float']},
        cF['edge_displace'] ={type:'radio',val:['edge_displace','none','clamp','wrap']}, //kaleido

        cF['centre-X_kaleido']={type:'X',val:[0,100,100]},
        cF['centre-Y_kaleido']={type:'X',val:[0,100,100]},
        cF['angle1_kaleido']={type:'X',val:[0,720,720,'',360]},
        cF['angle2_kaleido']={type:'X',val:[0,720,720,'',360]},
        cF['radius_kaleido']={type:'X',val:[0,100,100]},
        cF['side_kaleido']={type:'X',val:[1,27,27]},
        cF['edge_kaleido'] ={type:'radio',val:['edge_kaleido','none','clamp','wrap']},

        cF['x-scale_marble']={type:'X',val:[1,100,100]},
        cF['y-scale_marble']={type:'X',val:[1,100,100]},
        cF['turbul_marble']={type:'X',val:[1,15,15]},
        cF['edge_marble'] ={type:'radio',val:['edge_marble','none','clamp','wrap']},

        cF['centre-X_pinch']={type:'X',val:[0,100,100]},
        cF['centre-Y_pinch']={type:'X',val:[0,100,100]},
        cF['radius_pinch']={type:'X',val:[1,400,400]},
        cF['angle_pinch']={type:'X',val:[0,1440,1440,'',720]},
        cF['amount_pinch']={type:'X',val:[0,2,2,'float',1]},
        cF['edge_pinch'] ={type:'radio',val:['edge_pinch','none','clamp','wrap']},

		cF['centre-X_polar']={type:'X',val:[0,100,100]},
        cF['centre-Y_polar']={type:'X',val:[0,100,100]},
        cF['type_polar'] ={type:'radio',val:['type_polar','polar2rect','rect2polar']},

        cF['angel-X_shear']={type:'X',val:[0,360,360,'',180]},
        cF['angel-Y_shear']={type:'X',val:[0,360,360,'',180]},
        cF['edge_shear'] ={type:'radio',val:['edge_shear','none','clamp','wrap']},

        cF['centre-X_sphere']={type:'X',val:[0,100,100]},
        cF['centre-Y_sphere']={type:'X',val:[0,100,100]},
        cF['radius_sphere']={type:'X',val:[1,400,400]},
        cF['refra_sphere']={type:'X',val:[1,3,3,'float']},
        cF['edge_sphere'] ={type:'radio',val:['edge_sphere','none','clamp','wrap']},

        cF['centre-X_twirl']={type:'X',val:[0,100,100]},
        cF['centre-Y_twirl']={type:'X',val:[0,100,100]},
        cF['radius_twirl']={type:'X',val:[1,400,400]},
        cF['angle_twirl']={type:'X',val:[0,1440,1440,'',720]},
        cF['edge_twirl'] ={type:'radio',val:['edge_twirl','none','clamp','wrap']},
//basic 180, silide 40, checkbox 40 radio 3个选择70
        gui_filter.filterOpCF = {
            'basicblur':{
                build: ['x-Radius_basicblur','y-Radius_basicblur','Itertations_basicblur','Premultiply_basicblur','br'],
                vars:
                {
                    'x-Radius_basicblur': 0,
                    'y-Radius_basicblur': 0,
                    'Itertations_basicblur':2,
                    'Premultiply_basicblur': 'true'
                } ,
                size: 320
            },
            'gaussblur' :{
                build: ['Radius_gaussblur','Premultiply_gaussblur','br'],
                vars:{
                    'Radius_gaussblur': 5,
                    'Premultiply_gaussblur' :'true'
                },
                size : 240
            },
            'highpass':{
                build:['Radius_highpass','br'],
                vars:{'Radius_highpass': 100},
                size:220
            },
            'glow' :{
                build: ['Radius_glow','Amount_glow','br'],
                vars:{
                    'Radius_glow': 0,
                    'Amount_glow' :5
                },
                size : 260
            },
            'unsharp':{
                build:['Radius_unsharp','Amount_unsharp','Threshold_unsharp','br'],
                vars:{'Radius_unsharp':0,'Amount_unsharp':5,'Threshold_unsharp':4},
                size: 300
            },
            'lensblur':{
                build: ['Radius_lensblur','Sides_lensblur','Bloom_lensblur','Bloom-Threshold_lensblur','br'],
                vars:{
                    'Radius_lensblur':  3,
                    'Sides_lensblur' : 2,
                    'Bloom_lensblur': 2,
                    'Bloom-Threshold_lensblur': 255
                },
                size: 340//330
            },
            'adjustRGB':{
                build: ['R_adjustRGB','G_adjustRGB','B_adjustRGB','br'],
                vars:{
                    'R_adjustRGB' :1,
                    'G_adjustRGB': 1,
                    'B_adjustRGB' :1
                } ,
                size:300
            },
            'adjustHSB':{
                build: ['H_adjustHSB','S_adjustHSB','B_adjustHSB','br'],
                vars:{
                    'H_adjustHSB' :1,
                    'S_adjustHSB': 1,
                    'B_adjustHSB' :1
                },
                size:300
            },
            'contrast':{
                build: ['Bright_contrast','Contrast_contrast','br'],
                vars:{
                    'Bright_contrast' :1,
                    'Contrast_contrast': 1
                  },
                size:260
            },
			'exposure':{
				build:['scale_exposure','br'],
				vars:{
					'scale_exposure':2
				},
				size:220
			},
			'gain':{
				build: ['gain_gain','bias_gain','br'],
                vars:{
                    'gain_gain' :0.5,
                    'bias_gain': 0.5
                  },
                size:260
			},
			'gamma':{
				 build: ['R_gamma','G_gamma','B_gamma','br'],
                vars:{
                    'R_gamma' :1,
                    'G_gamma': 1,
                    'B_gamma' :1
                },
                size:300	
			},
			'invert':{
				build: [],
                vars:{},
                size: 180
			},
			'gray':{
				build: [],
                vars:{},
                size: 180
			},
			'grayout':{
				build: [],
                vars:{},
                size: 180
			},

            'detectEdge':{
                build: [],
                vars:{},
                size: 180
            },
            'laplace':{
                build: [],
                vars:{}  ,
                size: 180
            },
            'mosaic':{
                build:['blocksize_mosaic','br'],
                vars:{'blocksize_mosaic':1},
                size:220
            },
            'addnoise':{
                build:['amount_addnoise','density_addnoise','mono_addnoise','br'],
                vars:{
                    'amount_addnoise':30,
                    'density_addnoise':30,
                    'mono_addnoise':'false'
                },
                size:290
            },
            contour:{
                build:['level_contour','Offset_contour','scale_contour','br'],
                vars:{'level_contour':5,
                       'Offset_contour':0,
                        'scale_contour':1},
                size:300
            },
            dissolve:{
                build:['density_dissolve','softness_dissolve','br'],
                vars:{'density_dissolve':100,
                      'softness_dissolve':1 },
                size:260
            },
            emboss:{
                build:['angle_emboss','intensity_emboss','height_emboss','texture_emboss','br'],
                vars:{
                    'angle_emboss':270,
                    'intensity_emboss':90,
                    'height_emboss':100,
                    'texture_emboss':'false'
                },
                size:330
            },
            sparkle:{
                build:['centre-X_sparkle','centre-Y_sparkle','rays_sparkle','radius_sparkle','amount_sparkle','random_sparkle','br'],
                vars:{
                    'rays_sparkle':50,
                    'radius_sparkle':25,
                    'amount_sparkle':50,
                    'centre-X_sparkle':50,
                    'centre-Y_sparkle':50,
                    'random_sparkle':50
                } ,
                size:420
            },
            threshold:{
                build:['lower_threshold','upper_threshold','br'],
                vars:{
                    'lower_threshold':0,
                    'upper_threshold':255
                },
                size:260
            },
            circle:{
                build:['centre-X_circle','centre-Y_circle','radius_circle','height_circle',
                                    'angle_circle','spread_circle','edge_circle','br'],
                vars:{
                    'centre-X_circle':50,
                    'centre-Y_circle':50,
                    'radius_circle':0,
                    'height_circle':50 ,
                    'angle_circle':180,
                    'spread_circle':180,
                    'edge_circle':'clamp'
                },
                size:490
            },
            diffuse:{
                build:['scale_diffuse','edge_diffuse','br'],
                vars:{'scale_diffuse':1,
                    'edge_diffuse':'clamp'},
                size:290
            },
            displace:{
                build:['amount_displace','edge_displace','br'],
                vars:{'amount_displace':1,
                    'edge_displace':'none'},
                size:290
            },
            kaleido:{
                build:['centre-X_kaleido','centre-Y_kaleido','angle1_kaleido','angle2_kaleido','radius_kaleido',
                    'side_kaleido','edge_kaleido','br'],
                vars:{
                    'centre-X_kaleido':50,
                    'centre-Y_kaleido':50,
                    'angle1_kaleido':360,
                    'angle2_kaleido':360,
                    'radius_kaleido':0,
                    'side_kaleido':4,
                    'edge_kaleido':'clamp'
                },
                size:490
            },
			marble:{
				build:['x-scale_marble','y-scale_marble','turbul_marble','edge_marble','br'],
				vars:{
					'x-scale_marble':1,
					'y-scale_marble':1,
					'turbul_marble':1,
					'edge_marble':'clamp'
				},
				size:370
			},
            pinch:{
                build:['centre-X_pinch','centre-Y_pinch','radius_pinch','angle_pinch','amount_pinch','edge_pinch','br'],
                vars:{
                    'centre-X_pinch':50,
                    'centre-Y_pinch':50 ,
                    'radius_pinch':100,
                    'angle_pinch':720,
                    'amount_pinch':1,
                    'edge_pinch':'clamp'
                },
                size:450
            },
            polar:{
                build:['centre-X_polar','centre-Y_polar','type_polar','br'],
                vars:{
					'centre-X_polar':50,
                    'centre-Y_polar':50 ,
                    'type_polar':'rect2polar'
                },
//				run:1,
                size:320
            },
            sphere:{
                build:['centre-X_sphere','centre-Y_sphere','radius_sphere','refra_sphere','edge_sphere','br'],
                vars:{
                    'centre-X_sphere':50,
                    'centre-Y_sphere':50,
                    'radius_sphere':100,
                    'refra_sphere':1.5,
                    'edge_sphere':'clamp'
                },
                size:410
            },
            twirl:{
                build:['centre-X_twirl','centre-Y_twirl','radius_twirl','angle_twirl','edge_twirl','br'],
                vars:{
                    'centre-X_twirl':50,
                    'centre-Y_twirl':50,
                    'angle_twirl':720,
                    'radius_twirl':100,
                    'edge_twirl':'clamp'
                },
                size:410
            }
        }
    }

} ,

function(){

    function Rect(corx,cory,width,height){
        this.x = corx;
        this.y = cory;
        this.w = width;
        this.h = height;
    }
    /**
     * 每次filter处理一开始就要调用的东西，将 box的内容复制到filter，准备进行处理
     * @param m
     * @return {*}
     */
    function filter_active(m){
        var c = $2D('ctx_filter');
        co.copy('ctx_box', 'ctx_filter');    //ctx_box
        c.globalCompositeOperation = canvas.mode;
        if (marquee.on) {
            c.save();
            c.beginPath();
            marquee.draw(c);
            c.clip();
            marquee.on = 0;
            window.clearInterval(marqueeID);
        }
        return c;
    };
    /**
     * 每次filter处理结束后调用的东西，默认的是把ctx_filter的内容拷贝到ctx_temp上面，并且清空ctx_filter的内容。
     * @param m
     */
    function filter_up(m){
        var ctx_filter = $2D('ctx_filter');
        if(m =='ok'){
            co.copy('ctx_filter', 'ctx_box');
            ctx_filter.clearRect(0, 0, canvas.W, canvas.H);
            $2D('ctx_temp').clearRect(0, 0, canvas.W, canvas.H);

            canvas.history_set();
            return;
        }
        co.copy('ctx_filter', 'ctx_temp');
//        co.copy('ctx_filter', 'ctx_box');
        ctx_filter.clearRect(0, 0, canvas.W, canvas.H);

        if (marquee.ghost) {
            marquee.run();
            $2D('ctx_temp').restore();
        }
        moved = false;
    };
/**
 * 目前hooker只有filter在用，单独成立一个对象，而没有把他放在gui_filter里面，会为了以后可能还会有类似的应用。
 */
hooker={
    'change':function(){
        var filtername = gui_filter.filterNameDic[vars['fi']][vars['imgid']];
        var p = gui_filter.filterOpCF[filtername]['vars'];
        var r = {};
        var str = '';
        for(var i in p)
        {
            r[i] = vars[i];
            str += '"'+i+''+'":'+ r[i];
        }
    },
    'fi':function(m){
        var c = filter_active(m);
        var filtername = gui_filter.filterNameDic[vars['fi']][vars['imgid']];
        var p = gui_filter.filterOpCF[filtername]['vars'];
        var r = {};
        for(var i in p)
        {
            r[i.substr(0, i.indexOf('_'+filtername)).replace('-','')] = vars[i];
        }
        Alf[filtername].fi(r,$('ctx_filter'));
        filter_up();
    }
};
    /**
     *
     * @type {Object}
     */
    Alf ={
        'basicblur':{
            'xRadius': 0,
            'yRadius': 0,
            'Itertations': 2,
            'Premultiply' :'true',
             'fi': function(p,s,d){
                 var w = s.width, h = s.height;
                 var in_ctx = s.getContext('2d');
				 for(var i in p)this[i]=p[i];
                 var inp = in_ctx.getImageData(0,0,w,h);
                 var start = new Date().getTime();
                 var incom = ImageMath.compress(inp.data);
                 incom = this.a_box(p,w,h,incom);
                 ImageMath.decompress(incom,inp.data);
                 in_ctx.putImageData(inp,0,0);
             } ,
            a_box:function(p,w,h,incom){
                 var outcom = new Array(incom.length);
                 if(this['Premultiply'] =='true'){
                     ImageMath.premultiply(incom,0,incom.length);
                 }
                 for(var i = 0 ;i<this.Itertations;i++)
                 {
                     this.blurfun(incom,outcom,w,h,this.xRadius);
                     this.blurfun(outcom,incom,h,w,this.yRadius);
                 }
                 this.blurFractional(incom,outcom,w,h,this.xRadius);
                 this.blurFractional(outcom,incom,h,w,this.yRadius);
                 if(this.Premultiply =='true'){
                     ImageMath.unpremultiply(incom,0,incom.length);
                 }
                return incom;
            },
             blurfun:function(idata,odata,w,h,r) {
                 var widthMinus1 = w -1;
                 var r = parseInt(r);
                 var tableSize = 2*r +1;
                 var divide = [256* tableSize];
                 for(var i =0;i< 256*tableSize;i++)
                 {
                     divide[i] = parseInt(i/tableSize);
                 }
                 var inIndex = 0;
                 for(var y = 0;y<h; y++)
                 {
                     var outIndex = y;
                     var ta = 0,tr =0,tg =0,tb =0;
                     for(var i = -r;i<=r;i++)
                     {
                         var rgb = idata[(inIndex + parseInt(ImageMath.imclamp(i, 0, w - 1)))];
                         ta +=(rgb >>24&0xff);
                         tr +=(rgb >>16&0xff);
                         tg +=(rgb >>8&0xff);
                         tb +=(rgb &0xff);
                     }
                     for(var x= 0;x<w;x++){
                         odata[outIndex] = (divide[ta] << 24 | divide[tr] << 16 | divide[tg] << 8 | divide[tb]);
                         var i1 = x+ r+1;
                         if(i1 >widthMinus1)  i1 = widthMinus1;
                         var i2 =  x -r;
                         if(i2< 0) i2=0;
                         var rgb1 = idata[(inIndex + i1)];
                         var rgb2 = idata[(inIndex + i2)];
                         ta += (rgb1 >> 24 & 0xFF) - (rgb2 >> 24 & 0xFF);
                         tr += ((rgb1 & 0xFF0000) - (rgb2 & 0xFF0000) >> 16);
                         tg += ((rgb1 & 0xFF00) - (rgb2 & 0xFF00) >> 8);
                         tb += (rgb1 & 0xFF) - (rgb2 & 0xFF);
                         outIndex += h;
                     }
                     inIndex += w;
                 }
             },
             blurFractional:function(idata,odata,w,h,r){
                 r -= parseInt(r) ;
                 var f = 1/(1+2*r);
                 var inIndex = 0;
                 for(var y = 0;y<h;y++){
                     var outIndex = y;
                     odata[outIndex] = idata[0];
                     outIndex += h;
                     for(var x =1;x<w-1;x++){
                         var i = inIndex+x;
                         var rgb1 = idata[i-1];
                         var rgb2 = idata[i];
                         var rgb3 = idata[i+1];
                         var a1 = rgb1>>24 & 0xFF;
                         var r1 = rgb1>>16 & 0xFF;
                         var g1 = rgb1>>8 & 0xFF;
                         var b1 = rgb1 & 0xFF;
                         var a2 = rgb2>>24 & 0xFF;
                         var r2 = rgb2>>16 & 0xFF;
                         var g2 = rgb2>>8 & 0xFF;
                         var b2 = rgb2 & 0xFF;
                         var a3 = rgb3>>24 & 0xFF;
                         var r3 = rgb3>>16 & 0xFF;
                         var g3 = rgb3>>8 & 0xFF;
                         var b3 = rgb3 & 0xFF;
                         a1 = parseInt((a2 +(a1+a3)*r)*f);
                         r1 = parseInt((r2 +(r1+r3)*r)*f);
                         g1 = parseInt((g2 +(g1+g3)*r)*f);
                         b1 = parseInt((b2 +(b1+b3)*r)*f);
                         odata[outIndex] =(a1<<24 | r1<<16|g1<<8|b1);
                         outIndex+=h;
                     }
                     odata[outIndex]=idata[w-1];
                     inIndex+=w;
                 }
                 return odata;
             }
        },
        // used for convolve
        'ZERO_EDGES':0,
        'CLAMP_EDGES':1,
        'WRAP_EDGES':2,
        'cov_alpha':1,
        'cov_premu':1,
        'cov_edgeAction':1,//CLAMP_EDGES
        'gaussian':{
            makeKernel:function(r)
            {
                var rows = r*2+1;
                var matrix = new Array(rows);
                var sigma = r/3;
                var sigma22=2*sigma*sigma;
                var sigmapi2 = 6.283186*sigma;
                var sqrtsigmapi2= Math.sqrt(sigmapi2);
                var radius2= 2*r;
                var total = 0,index =0;
                for(var row = -r; row<=r;row++)
                {
                    var distance = row*row;
                    if(distance>radius2) matrix[index]=0;
                    else
                        matrix[index] = Math.exp(-distance / sigma22) / sqrtsigmapi2;
                    total += matrix[index];
                    index++;
                }
                for(var i = 0;i<rows;i++)
                    matrix[i]/= total;
                return matrix;
            },
            convolveAndTranspose:function(matrix,indata,outdata,w,h,alpha,premultiply,unpre,edgeAction){
                var cols = matrix.length;
                var cols2 = parseInt(cols/2);
                for(var y =0;y<h;y++)
                {
                    var index = y,ioffset = y*w;
                    for(var x =0;x<w;x++)
                    {
                        var r = 0,g= 0,b= 0,a=0;
                        var moffset = cols2;
                        for(var col = -cols2; col <= cols2; col++)
                        {
                            var f = matrix[moffset+col];
                            if(f !=0)
                            {
                                var ix= x+col;
                                if(ix<0){
                                    if(edgeAction == Alf.CLAMP_EDGES) ix = 0;
                                    else if(edgeAction == Alf.WRAP_EDGES) ix= (x+w)%w;
                                } else if(ix>= w){
                                    if (edgeAction == Alf.CLAMP_EDGES) ix = w - 1;
                                    else if (edgeAction == Alf.WRAP_EDGES) ix = (x + w) % w;
                                }
                                var rgb =indata[ioffset +ix];
                                var pa = rgb >>24 &0xff;
                                var pr = rgb>>16&0xff;
                                var pg = rgb >>8&0xff;
                                var pb = rgb & 0xff;
                                if(premultiply)
                                {
                                   var a255=pa/255;
                                    pr = Math.round(pr*a255);
                                    pg = Math.round(pg*a255);
                                    pb = Math.round(pb*a255);
                                }
                                a+= f*pa;
                                r += f * pr;
                                g += f * pg;
                                b += f * pb;
                            }
                        }
                        if((unpre) && (a != 0) && (a = 255))
                        {
                            var f = 255.0/a;
                            r *= f; g *= f;  b *= f;
                        }
                        var ia = alpha?PU.puclamp(parseInt(a+0.5)):255;
                        var ir = PU.puclamp(parseInt(r+0.5));
                        var ig = PU.puclamp(parseInt(g+0.5));
                        var ib = PU.puclamp(parseInt(b+0.5));
                        outdata[index]= (ia << 24 | ir << 16 | ig << 8 | ib);
                        index+=h;
                    }
                }
                return outdata;
            }
        },
        gaussblur:{
            'Radius':2,
            'Premultiply':'true',
            'fi':function(p,s,d){
                var start = new Date().getTime();
                for(var i in p)this[i]=p[i];
                var w= s.width,h= s.height;
                var in_ctx = s.getContext('2d');
                var inp=in_ctx.getImageData(0,0,w,h);
                var incom= ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                if(this.Radius>0)
                {
                    var matrix = Alf.gaussian.makeKernel(this.Radius);
                    outcom = Alf.gaussian.convolveAndTranspose(matrix,incom,outcom,w,h,Alf.cov_alpha,Alf.cov_alpha&&Alf.cov_premu,false,Alf.CLAMP_EDGES);
                    incom = Alf.gaussian.convolveAndTranspose(matrix,outcom,incom,h,w,Alf.cov_alpha,false,Alf.cov_alpha&&Alf.cov_premu,Alf.CLAMP_EDGES);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);

            }
        } ,
        glow:{
            'Radius':0,
            'Amount': 0,
            'fi':function(p,s,d){
                var start = new Date().getTime();
                for(var i in p){this[i] = p[i];}
                var w= s.width,h= s.height;
                var in_ctx = s.getContext('2d');
                var inp=in_ctx.getImageData(0,0,w,h);
                var incom= ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                if(this.Radius>0)
                {
                    var matrix = Alf.gaussian.makeKernel(this.Radius);
                    outcom = Alf.gaussian.convolveAndTranspose(matrix,incom,outcom,w,h,Alf.cov_alpha,Alf.cov_alpha&&Alf.cov_premu,false,Alf.CLAMP_EDGES);
                    incom = Alf.gaussian.convolveAndTranspose(matrix,outcom,incom,h,w,Alf.cov_alpha,false,Alf.cov_alpha&&Alf.cov_premu,Alf.CLAMP_EDGES);
                }
                outcom = ImageMath.compress(inp.data);
                var aaa = 4*this.Amount/100;
                var index = 0;
                for(var y = 0;y<h;y++){
                    for(var x = 0;x<w;x++){
                        var rgb1 = outcom[index];
                        var r1 = rgb1 >> 16 & 0xFF;
                        var g1 = rgb1 >> 8 & 0xFF;
                        var b1 = rgb1 & 0xFF;

                        var rgb2 = incom[index];
                        var r2 = rgb2 >> 16 & 0xFF;
                        var g2 = rgb2 >> 8 & 0xFF;
                        var b2 = rgb2 & 0xFF;
                        r1 = PU.puclamp(parseInt(r1+aaa*r2));
                        g1 = PU.puclamp(parseInt(g1+aaa*g2));
                        b1 = PU.puclamp(parseInt(b1+aaa*b2));
                        incom[index] = (rgb1 & 0xFF000000 | r1 << 16 | g1 << 8 | b1)
                        index++;
                    }
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            }
        },
        'unsharp':{
            'Radius':2,
            'Amount':5,
            'Threshold':4,
            'fi':function(p,s,d){
                var start = new Date().getTime();
                for(var i in p){this[i] = p[i];}
                var w= s.width,h= s.height;
                var in_ctx = s.getContext('2d');
                var inp=in_ctx.getImageData(0,0,w,h);
                var incom= ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                if(this.Radius>0)
                {
                    var matrix = Alf.gaussian.makeKernel(this.Radius);
                    outcom = Alf.gaussian.convolveAndTranspose(matrix,incom,outcom,w,h,Alf.cov_alpha,Alf.cov_alpha&&Alf.cov_premu,false,Alf.CLAMP_EDGES);
                    incom = Alf.gaussian.convolveAndTranspose(matrix,outcom,incom,h,w,Alf.cov_alpha,false,Alf.cov_alpha&&Alf.cov_premu,Alf.CLAMP_EDGES);
                }
                outcom = ImageMath.compress(inp.data);
                var index = 0;
                var aaa = 4*this.Amount/100;
                for(var y = 0;y<h;y++){
                    for(var x = 0;x<w;x++){
                        var rgb1 = outcom[index];
                        var r1 = rgb1 >> 16 & 0xFF;
                        var g1 = rgb1 >> 8 & 0xFF;
                        var b1 = rgb1 & 0xFF;
                        var rgb2 = incom[index];
                        var r2 = rgb2 >> 16 & 0xFF;
                        var g2 = rgb2 >> 8 & 0xFF;
                        var b2 = rgb2 & 0xFF;
                        if (Math.abs(r1 - r2) >= this.Threshold)
                            r1 = PU.puclamp(parseInt((aaa + 1) * (r1 - r2) + r2));
                        if (Math.abs(g1 - g2) >= this.Threshold)
                            g1 = PU.puclamp(parseInt((aaa + 1) * (g1 - g2) + g2));
                        if (Math.abs(b1 - b2) >= this.Threshold) {
                            b1 = PU.puclamp(parseInt((aaa + 1) * (b1 - b2) + b2));
                        }
                        incom[index] = (rgb1 & 0xFF000000 | r1 << 16 | g1 << 8 | b1)
                        index++;
                    }
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            }
        },
        'highpass':{
            'Radius':2,
            'fi':function(p,s,d){
                var start = new Date().getTime();
                for(var i in p){this[i]=p[i]};
                var w= s.width,h= s.height;
                var in_ctx = s.getContext('2d');
                var inp=in_ctx.getImageData(0,0,w,h);
                var incom= ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                if (this.Radius > 0) {
                    var matrix = Alf.gaussian.makeKernel(this.Radius);
                    outcom = Alf.gaussian.convolveAndTranspose(matrix,incom,outcom,w,h,Alf.cov_alpha,Alf.cov_alpha&&Alf.cov_premu,false,Alf.CLAMP_EDGES);
                    incom = Alf.gaussian.convolveAndTranspose(matrix,outcom,incom,h,w,Alf.cov_alpha,false,Alf.cov_alpha&&Alf.cov_premu,Alf.CLAMP_EDGES);
                }
                outcom = ImageMath.compress(inp.data);
                var index = 0;
                for(var y = 0;y<h;y++){
                    for(var x = 0;x<w;x++){
                        var rgb1 = outcom[index];
                        var r1 = rgb1 >> 16 & 0xFF;
                        var g1 = rgb1 >> 8 & 0xFF;
                        var b1 = rgb1 & 0xFF;

                        var rgb2 = incom[index];
                        var r2 = rgb2 >> 16 & 0xFF;
                        var g2 = rgb2 >> 8 & 0xFF;
                        var b2 = rgb2 & 0xFF;
                        r1 = parseInt((r1 + 255 - r2) / 2);
                        g1 = parseInt((g1 + 255 - g2) / 2);
                        b1 = parseInt((b1 + 255 - b2) / 2);
                        incom[index] = (rgb1 & 0xFF000000 | r1 << 16 | g1 << 8 | b1)
                        index++;
                    }
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);

            }
        },
        'lensblur':{
            'Radius': 10,
            'Sides':5,
            'Bloom':2,
            'BloomThreshold':255, //这个名词和外面在使用的名称不同。
            'angle':0,
            'fi':function(p,s,d){
				var start = new Date().getTime();
                var width = s.width,height = s.height;
                var in_ctx = s.getContext('2d');
				for(var i in p){
					this[i] = p[i];
				}
                var inp = in_ctx.getImageData(0,0,width,height);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                var rows= 1,cols = 1;
                var log2rows = 0,log2cols = 0;
                var iradius = Math.ceil(this.Radius);
                var tileWidth = 128,tileHeight = 128;
                var adjustedWidth  = width  + iradius * 2;
                var adjustedHeight = height + iradius * 2;
                tileWidth= iradius<32?Math.min(128,width+2*iradius):Math.min(256,width+2*iradius);
                tileHeight=iradius<32?Math.min(128,height+2*iradius):Math.min(256,height+2*iradius);

                while(rows<tileHeight){
                    rows*=2; log2rows++;
                }
                while(cols< tileWidth)
                {
                    cols *= 2; log2cols++;
                }
                var w = cols, h= rows;
                tileWidth =w;
                tileHeight = h;
                fft.init(Math.max(log2rows,log2cols));

                var rgb = new Array(w*h);
                var mask = new Array(2);
                mask[0] = new Array(w*h);
                mask[1] = new Array(w*h);
                var gb = new Array(2);
                gb[0] = new Array(w*h);
                gb[1] = new Array(w*h);
                var ar = new Array(2);
                ar[0] = new Array(w*h);
                ar[1] = new Array(w*h);

                var polyAngle = Math.PI/this.Sides;
                var polyScale = 1/Math.cos(polyAngle);
                var r2 = this.Radius * this.Radius;
                var rangle =  this.angle /180 * Math.PI;
                var total = 0, i = 0;
                for(var y = 0;y<h;y++){
                    for(var x = 0;x<w;x++){
                        var dx = x-w/ 2,dy = y-h/2;
                        var r = dx*dx + dy*dy;
                        var f = r < r2 ? 1:0;
                        if(f != 0){
                            r = Math.sqrt(r);
                            if(this.Sides!=0){
                                var a = Math.atan2(dy,dx) + rangle;
                                a = ImageMath.mod__ee(a,polyAngle *2) -polyAngle;
                                f = Math.cos(a)*polyScale;
                            }
                            else{
                                f = 1;
                            }
                            f = f*r< this.Radius?1:0;
                        }
                        total += f;
                        mask[0][i] = f;
                        mask[1][i] = 0;
                        i++;
                    }
                }
                i = 0;
                for(var y = 0;y<h;y++)
                {
                    for(var x=0; x<w;x++)
                    {
                        mask[0][i]=mask[0][i]/total;
                        i++;
                    }
                }
                var retemp = fft.transform2D(mask[0],mask[1],w,h,true);
				mask[0] = retemp[0];
				mask[1] = retemp[1];

                for(var tileY = -iradius; tileY < height; tileY += tileHeight - 2 * iradius){
                    for(var tileX = -iradius; tileX < width; tileX += tileWidth - 2 * iradius){
                        var tx = tileX; var ty = tileY; var tw = tileWidth; var th = tileHeight;
                        var fx = 0,fy = 0;
                        if (tx < 0) {
                            tw += tx;
                            fx -= tx;
                            tx = 0;
                        }
                        if (ty < 0) {
                            th += ty;
                            fy -= ty;
                            ty = 0;
                        }
                        if (tx + tw > width){
                            tw = width - tx;
                        }
                        if (ty + th > height){
                            th = height - ty;
                        }
                        rgb = ImageMath.getDataFromCompress(tx,ty,tw,th,rgb,fy*w+fx,w,incom,width,height);
                        i = 0;
                        for(var y = 0;y<h;y++){
                            var imageY = y+tileY;
                            var j = 0;
                            if(imageY<0) j= fy;
                            else{
                                if(imageY>height) j=fy+th-1;
                                else j = y;
                            }
                            j *=w;
                            for(var x = 0;x<w;x++){
                                var imageX = x + tileX;
                                var k = 0;
                                if(imageX <0) k = fx;
                                else{
                                    if(imageX > width) k = fx+tw-1;
                                    else k = x;
                                }
                                k+= j;
                                ar[0][i]=rgb[k]>>24&0xff;
                                var r = rgb[k] >> 16 & 0xFF;
                                var g = rgb[k] >> 8 & 0xFF;
                                var b = rgb[k] & 0xFF;

                                if(r > this.BloomThreshold) r*= this.Bloom;
                                if(g>this.BloomThreshold) g*=this.Bloom;
                                if(b>this.BloomThreshold) b*=this.Bloom;

                                ar[1][i]= r;gb[0][i]=g;gb[1][i]=b;

                                i++;k++
                            }
                        }

                        retemp = fft.transform2D(ar[0],ar[1],cols,rows,true);
						ar[0] = retemp[0];
						ar[1] = retemp[1];
                        retemp = fft.transform2D(gb[0],gb[1],cols,rows,true);
						gb[0] = retemp[0];
						gb[1] = retemp[1];
                        i=0;
                        for(var y =0;y<h;y++){
                           for(var x = 0;x<w;x++){
                               var re = ar[0][i];
                               var im = ar[1][i];
                               var rem = mask[0][i];
                               var imm = mask[1][i];
                               ar[0][i] = (re * rem - im * imm);
                               ar[1][i] = (re * imm + im * rem);
                               re = gb[0][i];
                               im = gb[1][i];
                               gb[0][i] = (re * rem - im * imm);
                               gb[1][i] = (re * imm + im * rem);
                               i++;
                           }
                        }
//这里出现问题
                        retemp = fft.transform2D(ar[0], ar[1], cols, rows, false);
						ar[0] = retemp[0];
						ar[1] = retemp[1];
                        retemp = fft.transform2D(gb[0], gb[1], cols, rows, false);
						gb[0] = retemp[0];
						gb[1] = retemp[1];
                        var row_flip = w >> 1;
                        var col_flip = h >> 1;
                        var index = 0;

                        for(var y = 0;y<w;y++){
                            var ym = y ^ row_flip;
                            var yi = ym * cols;
                            for(var x = 0;x<w;x++){
                                var xm = yi + (x ^ col_flip);
                                var a = parseInt(ar[0][xm]);
                                var r = parseInt(ar[1][xm]);
                                var g = parseInt(gb[0][xm]);
                                var b = parseInt(gb[1][xm]);
                                if(r > 255) r =255;
                                if(g>255) g = 255;
                                if(b>255) b = 255;
                                rgb[index++]=a << 24 | r << 16 | g << 8 | b;
                            }
                        }

                        tx = tileX + iradius;
                        ty = tileY + iradius;
                        tw = tileWidth - 2 * iradius;
                        th = tileHeight - 2 * iradius;
                        if (tx + tw > width) tw = width - tx;
                        if (ty + th > height)  th = height - ty;

                        ImageMath.putData2Compress(tx,ty,tw,th,rgb,iradius * w + iradius, w,incom,width,height);
                    }
                }				
                ImageMath.decompress(incom,inp.data);
				in_ctx.putImageData(inp,0,0);				
            }
        } ,
         //color
        'adjustHSB':{
            'H_value':0,
            'S_value':0,
            'B_value':0,
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                for(var i in p){ this[i+"_value"] = Math.round((p[i]-1)*100)/100; 
				}
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.hsbpixel(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);

                in_ctx.putImageData(inp,0,0);
            },
            hsbpixel:function(width,height,rgb){

                var a = rgb & 0xff000000;
                var r = (rgb >> 16) & 0xff;
                var g = (rgb >> 8) & 0xff;
                var b = rgb & 0xff;
                var hsb = ImageMath.RGB2HSB(r, g, b, hsb);
                hsb[0] += this.H_value;
                while (hsb[0] < 0)
                    hsb[0] += Math.PI*2;
                hsb[1] += this.S_value;
                if (hsb[1] < 0)
                    hsb[1] = 0;
                else if (hsb[1] > 1.0)
                    hsb[1] = 1.0;
                hsb[2] += this.B_value;
                if (hsb[2] < 0)
                    hsb[2] = 0;
                else if (hsb[2] > 1.0)
                    hsb[2] = 1.0;
                rgb = ImageMath.HSB2RGB(hsb[0], hsb[1], hsb[2]);
                return a | (rgb & 0xffffff);
            }
        },
        'adjustRGB':{
            'R_value':0,
            'G_value':0,
            'B_value':0,
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                for(var i in p){ this[i] =p[i];}
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var start = new Date().getTime();
                for(var i in p){ this[i+"_value"] = Math.round((p[i])*100)/100; 
				}
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.rgbpixel(inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            rgbpixel:function(rgb){
                var a = rgb & 0xFF000000;
                var r = rgb >> 16 & 0xFF;
                var g = rgb >> 8 & 0xFF;
                var b = rgb & 0xFF;
                r = PU.puclamp(Math.round(r * this.R_value));
                g = PU.puclamp(Math.round(g * this.G_value));
                b = PU.puclamp(Math.round(b * this.B_value));
                return a | r << 16 | g << 8 | b;
            }
        },
        'contrast':{
            'Bright':1,
            'Contrast':1,
            'rTable':[],
            'gTable':[],
            'bTable':[],
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                for(var i in p){ this[i] = Math.round(p[i]*100)/100; 
				}
                this.rTable=this.gTable=this.bTable= this.maketable();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);

                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.prcsrgb(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            prcsrgb:function(x,y,rgb){
                var a = rgb & 0xFF000000;
                var r = rgb >> 16 & 0xFF;
                var g = rgb >> 8 & 0xFF;
                var b = rgb & 0xFF;
                r = this.rTable[r];
                g = this.gTable[g];
                b = this.bTable[b];
                return a | r << 16 | g << 8 | b;
            },
            trsfer:function(f){
                f *= this.Bright;
                f = (f-0.5)*this.Contrast +0.5;
                return f;
            },
            maketable:function(){
                var table = new Array(256);
                for(var i = 0;i<256;i++){
                    table[i] = PU.puclamp(Math.round(255* this.trsfer(i/255)));
                }
                return table;
            }

        },
		'exposure':{
			'scale':2,
			'rTable':[],
            'gTable':[],
            'bTable':[],
			'fi':function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                for(var i in p){ this[i] = Math.round(p[i]*100)/100; 
				}
                this.rTable=this.gTable=this.bTable= this.maketable();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);

                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.prcsrgb(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            prcsrgb:function(x,y,rgb){
                var a = rgb & 0xFF000000;
                var r = rgb >> 16 & 0xFF;
                var g = rgb >> 8 & 0xFF;
                var b = rgb & 0xFF;
                r = this.rTable[r];
                g = this.gTable[g];
                b = this.bTable[b];
                return a | r << 16 | g << 8 | b;
            },
            trsfer:function(f){
                
                return 1-Math.exp(-f*this.scale);
            },
            maketable:function(){
                var table = new Array(256);
                for(var i = 0;i<256;i++){
                    table[i] = PU.puclamp(Math.round(255* this.trsfer(i/255)));
                }
                return table;
            }
		},
		gain:{
			'gain':2,
			'bias':0.5,
			'rTable':[],
            'gTable':[],
            'bTable':[],
			'fi':function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                for(var i in p){ this[i] = Math.round(p[i]*100)/100; 
				}
                this.rTable=this.gTable=this.bTable= this.maketable();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);

                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.prcsrgb(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            prcsrgb:function(x,y,rgb){
                var a = rgb & 0xFF000000;
                var r = rgb >> 16 & 0xFF;
                var g = rgb >> 8 & 0xFF;
                var b = rgb & 0xFF;
                r = this.rTable[r];
                g = this.gTable[g];
                b = this.bTable[b];
                return a | r << 16 | g << 8 | b;
            },
            trsfer:function(f){
                f = ImageMath.imgain(f, this.gain);
				f = ImageMath.imbias(f, this.bias);
				return f;
            },
            maketable:function(){
                var table = new Array(256);
                for(var i = 0;i<256;i++){
                    table[i] = PU.puclamp(Math.round(255* this.trsfer(i/255)));
                }
                return table;
            }
		},
		gamma:{
            'R':1,
            'G':1,
			'B':1,
            'rTable':[],
            'gTable':[],
            'bTable':[],
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                for(var i in p){ this[i] = Math.round(p[i]*100)/100; 
				}
				this.rTable= this.maketable(this.R);
				this.gTable= this.maketable(this.G);
				this.bTable= this.maketable(this.B);
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);

                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.prcsrgb(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);

                in_ctx.putImageData(inp,0,0);
            },
            prcsrgb:function(x,y,rgb){
                var a = rgb & 0xFF000000;
                var r = rgb >> 16 & 0xFF;
                var g = rgb >> 8 & 0xFF;
                var b = rgb & 0xFF;
                r = this.rTable[r];
                g = this.gTable[g];
                b = this.bTable[b];
                return a | r << 16 | g << 8 | b;
            },

            maketable:function(gamma){
                var table = new Array(256);
                for(var i = 0;i<256;i++){
					var v = parseInt(255 * Math.pow(i / 255, 1 / gamma) + 0.5);
					if(v >255) v= 255;
					table[i]=v;
                }
                return table;
			}
        },
		invert:{
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                for(var i in p){ this[i] =p[i];}
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var start = new Date().getTime();
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.rgbpixel(inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            rgbpixel:function(rgb){
                var a = rgb&0xff000000;
                return a | (rgb ^ 0xFFFFFFFF) & 0xFFFFFF;
            }
        },
		'gray':{
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                for(var i in p){ this[i] =p[i];}
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var start = new Date().getTime();
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.rgbpixel(inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            'rgbpixel':function(rgb){
                var a = rgb & 0xFF000000;
				var r = rgb >> 16 & 0xFF;
				var g = rgb >> 8 & 0xFF;
				var b = rgb & 0xFF;
				rgb = r * 77 + g * 151 + b * 28 >> 8;
				return a | rgb << 16 | rgb << 8 | rgb;
            }
        },
		'grayout':{
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                for(var i in p){ this[i] =p[i];}
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var start = new Date().getTime();
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.rgbpixel(inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            'rgbpixel':function(rgb){
                var a = rgb & 0xFF000000;
				var r = rgb >> 16 & 0xFF;
				var g = rgb >> 8 & 0xFF;
				var b = rgb & 0xFF;
				r = (r + 255) / 2;
				g = (g + 255) / 2;
				b = (b + 255) / 2;
				return a | r << 16 | g << 8 | b;
            }
        },
        //edge
        'detectEdge':{
            'fi':function(p,s,d){

                var w = s.width, h = s.height;
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                incom = this.edgepixel(w,h,incom);
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            } ,
            hEdgeMatrix : [ -1, -2, -1, 0, 0, 0, 1, 2, 1 ],
            vEdgeMatrix : [ -1, 0, 1, -2, 0, 2, -1, 0, 1 ],
            'edgepixel':function(width,height,indata)
            {
                var index =0;
                var outdata = new Array(width*height);
                for(var y = 0;y<height;y++){
                    for(var x = 0;x<width;x++)
                    {
                        var r = 0,g = 0,b= 0, rh= 0,gh= 0,bh= 0,rv= 0,gv= 0,bv=0;
                        var a = indata[y*width+x]&0xff000000;

                        for(var row=-1;row<=1;row++)
                        {
                            var iy = y+row;
                            var ioffset = 0;
                            if ((0 <= iy) && (iy < height))
                                ioffset = iy * width;
                            else
                                ioffset = y * width;
                            var moffset = 3 * (row + 1) + 1;
                            for (var col = -1; col <= 1; col++){
                                var ix = x + col;
                                if ((0 > ix) || (ix >= width)) ix = x;
                                var rgb = indata[(ioffset + ix)];
                                var h = this.hEdgeMatrix[(moffset + col)];
                                var v = this.vEdgeMatrix[moffset+col];

                                r = (rgb & 0xFF0000) >> 16;
                                g = (rgb & 0xFF00) >> 8;
                                b = rgb & 0xFF;
                                rh += parseInt(h * r);
                                gh += parseInt(h * g);
                                bh += parseInt(h * b);
                                rv += parseInt(v * r);
                                gv += parseInt(v * g);
                                bv += parseInt(v * b);

                            }
                        }
                        r = parseInt(Math.sqrt(rh * rh + rv * rv) / 1.8);
                        g = parseInt(Math.sqrt(gh * gh + gv * gv) / 1.8);
                        b = parseInt(Math.sqrt(bh * bh + bv * bv) / 1.8);
                        r = PU.puclamp(r);
                        g = PU.puclamp(g);
                        b = PU.puclamp(b);
                        outdata[(index++)] = (a | r << 16 | g << 8 | b);
                    }
                }
                return outdata;
            }
        } ,
        'dof':{

        } ,
        'laplace':{
            'fi':function(p,s,d){
                var w = s.width, h = s.height;
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var pixels = new Array(w);
                var row1 = new Array(w);
                var row2 = new Array(w);
                var row3 = new Array(w);
                row1 = ImageMath.getDataFromCompress(0,0,w,1,row1,0,w,incom,w,h);
                row2 = ImageMath.getDataFromCompress(0,0,w,1,row2,0,w,incom,w,h);
                this.br(row1);
                this.br(row2);
                for(var y = 0; y < h; y++){
                    if(y <h-1){
                        row3 = ImageMath.getDataFromCompress(0,y+1,w,1,row3,0,w,incom,w,h);
                        this.br(row3);
                    }
                    pixels[0] = pixels[w-1]= -16777216//0xff000000;
                    for(var x =1;x<w-1;x++){
                        var l1 = row2[x-1];
                        var l2 = row1[x];
                        var l3 = row3[x];
                        var l4 = row2[x+1];
                        var l = row2[x];
                        var max = Math.max( Math.max( l1, l2 ), Math.max( l3, l4 ) );
                        var min = Math.min( Math.min( l1, l2 ), Math.min( l3, l4 ) );

                        var gradient = Math.round(0.5 * Math.max( (max - l), (l - min) ));

                        var r = ((row1[x-1] + row1[x] + row1[x+1] +
                                row2[x-1] - (8 * row2[x]) + row2[x+1] +
                                row3[x-1] + row3[x] + row3[x+1]) > 0) ?
                                    gradient : (128 + gradient);
                        pixels[x] = r;
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,pixels,0,w,incom,w,h);
                    var t = row1; row1 = row2; row2 = row3; row3 = t;
                }

                row1 = ImageMath.getDataFromCompress(0,0,w,1,row1,0,w,incom,w,h);
                row2 = ImageMath.getDataFromCompress(0,0,w,1,row2,0,w,incom,w,h);
                for(var y = 0;y<h;y++){
                    if(y <h-1){
                        row3 = ImageMath.getDataFromCompress(0,y+1,w,1,row3,0,w,incom,w,h);
                    }
                    pixels[0] = pixels[w-1] = -16777216//0xff000000;
                    for ( var x = 1; x < w-1; x++ ) {
                        var r = 0xff000000 | row2[x];
                        r = (((r <= 128) &&
                          ((row1[x - 1] > 128) ||
                           (row1[x] > 128)         ||
                           (row1[x + 1] > 128) ||
                           (row2[x - 1] > 128) ||
                           (row2[x + 1] > 128) ||
                           (row3[x - 1] > 128) ||
                           (row3[x] > 128)         ||
                           (row3[x + 1] > 128))) ?
                         ((r >= 128) ? (r - 128) : r) : 0);
                        pixels[x] = 0xff000000 | (r << 16) | (r << 8) | r;
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,pixels,0,w,incom,w,h);
                    var t = row1; row1 = row2; row2 = row3; row3 = t;
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            'br':function(arr)
            {
                for(var i = 0;i<arr.length;i++)
                {
                    var rgb = arr[i];
                    var parr = PU.disass(rgb);
                    arr[i] = parseInt((parr[1]+parr[2]+parr[3])/3);
                }
                return arr;
            }
        },
        //custom
        'mosaic':{
            'blocksize':1,
            'fi':function(p,s,d){
                var start = new Date().getTime();
                for(var i in p){this[i] = p[i];}
                var width= s.width,height= s.height;
                var in_ctx = s.getContext('2d');
                var inp=in_ctx.getImageData(0,0,width,height);
                var incom= ImageMath.compress(inp.data);
                var pixels = new Array(this.blocksize*this.blocksize);
                for(var y = 0;y<height;y+= this.blocksize){
                    for(var x = 0;x<width;x+= this.blocksize){
                        var w = Math.min(this.blocksize,width-x);
                        var h = Math.min(this.blocksize,height -y);
                        var t = w*h;
                        pixels = ImageMath.getDataFromCompress(x,y,w,h,pixels,0,w,incom,width,height);
                        var r = 0,g= 0,b=0;
                        var i = 0;
                        for(var by = 0;by<h;by++){
                            for(var bx =0;bx<w;bx++){
                                var tempargb = pixels[i];
                                r += (tempargb >> 16 & 0xFF);
                                g += (tempargb >> 8 & 0xFF);
                                b += (tempargb & 0xFF);
                                i++;
                            }
                        }
                        var argb = r / t << 16 | g / t << 8 | b / t;
                        i =0;
                        for (var by = 0; by < h; by++) {
                            for (var bx = 0; bx < w; bx++) {
                                pixels[i] = (pixels[i] & 0xFF000000 | argb);
                                i++;
                            }
                        }
                        ImageMath.putData2Compress(x,y,w,h,pixels,0, w,incom,width,height);
                    }

                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            }
        },
        //
        'addnoise':{
            'amount' :30,
            'density':30,
            'distribute' : 'gaussian',
            'mono': 'false',
            'fi':function(p,s,d){
                this.randomNum = Math.random();
                var w = s.width, h = s.height;
                var start = new Date().getTime();
  
                for(var i in p){ this[i] = p[i]; 
				}
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                //getDataFromCompress(0,0,w,1,row1,0,w,incom,w,h);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.noiseRGB(inpixel[x],x,y);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);

                in_ctx.putImageData(inp,0,0);
            },
            'noiseRGB':function(rgb,x,y){
                if(Math.random() <= this.density/100){
                    var a = rgb & 0xFF000000;
                    var r = rgb >> 16 & 0xFF;
                    var g = rgb >> 8 & 0xFF;
                    var b = rgb & 0xFF;
                    if (this.mono =='true') {
                        var n = parseInt((2* Math.random() - 1.0)* this.amount);
                        r = PU.puclamp(r + n);
                        g = PU.puclamp(g + n);
                        b = PU.puclamp(b + n);
                    } else {
                        r = this.rannoise(r);
                        g = this.rannoise(g);
                        b = this.rannoise(b);
                    }
                    return a | r << 16 | g << 8 | b;
                }
                else
                    return rgb;
            },
            'rannoise':function(x){
                x += parseInt((2 * Math.random() - 1) * this.amount);
                if (x < 0)
                    x = 0;
                else if (x > 255)
                    x = 255;
                return x;
            }
        },
        contour:{
            level:5,
            Offset:0,
            scale:1,
            contourColor: -16777216,
            fi:function(p,s,d){

                for(var i in p ){ this[i] = p[i];
				}
                var w = s.width, h = s.height;
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                incom = this.contourpixel(w,h,incom);
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            contourpixel:function(width,height,indata){
                var index = 0;
                var outpixel = new Array(width*height);
                var table = new Array(256);
                var offsetl = parseInt(this.Offset*256/this.level);
                var r = new Array(3);
                r[0] = new Array(width);
                r[1] = new Array(width);
                r[2] = new Array(width);
                for(var i = 0;i<256;i++){
                    table[i] = PU.puclamp(parseInt(255 * Math.floor(this.level*(i+offsetl) / 256) / (this.level-1) - offsetl));
                }
                for(var x = 0;x<width;x++){
                    r[1][x]=PU.brightness(indata[x]);
                }
                for(var y = 0;y<height;y++){
                    var yIn = (y>0)&&(y<height-1);
                    var nextRowIndex = index+width;
                    if(y<height-1){
                        for(var x = 0;x<width;x++){
                            r[2][x]=PU.brightness(indata[nextRowIndex++]);
                        }
                    }
                    for(var x =0;x<width;x++){
                        var xIn = (x>0)&&(x<width-1);
                        var w = x-1;
                        var e = x+1;
                        var v = 0;

                        if(yIn && xIn){
                            var nwb = r[0][w];
                            var neb = r[0][x];
                            var swb = r[1][w];
                            var seb = r[1][x];
                            var nw = table[nwb];
                            var ne = table[neb];
                            var sw = table[swb];
                            var se = table[seb];

                            if (nw != ne || nw != sw || ne != se || sw != se) {
                                v= PU.puclamp(parseInt(this.scale * (Math.abs(nwb - neb) + Math.abs(nwb - swb) + Math.abs(neb - seb) + Math.abs(swb - seb))));
                            }
                        }
                        if ( v != 0 )
                            outpixel[index] = PU.combinePixels( indata[index], this.contourColor, PU.NORMAL, v );
                        else
                            outpixel[index] = indata[index];
                        index++;
                    }
                    var t = new Array(256);
                    t = r[0];
                    r[0] = r[1];
                    r[1] = r[2];
                    r[2] = t;
                }

                return outpixel;
            }//
        },
        dissolve:{
            density:0.8,
            softness:0.3,
            maxDensity:1,
            minDensity:0,
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();

                for(var i in p){
                    this[i] = Math.round((p[i]/100)*100)/100;

					}
  
                var d = (1-this.density)*(1+this.softness);
                this.minDensity = d-this.softness;
                this.maxDensity =d;


                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                //getDataFromCompress(0,0,w,1,row1,0,w,incom,w,h);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.dissolvePixel(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);

                in_ctx.putImageData(inp,0,0);
            },
            dissolvePixel:function(x,y,rgb){
                var a = rgb>>24&0xff;
                var v = Math.random();
                var f = ImageMath.smoothStep(this.minDensity,this.maxDensity,v);
                return parseInt(a*f)<<24 |rgb & 0xFFFFFF;
            }
        },
        emboss:{
            angle:270*Math.PI/180,
            intensity:30*Math.PI/180,
            height:3,
            texture:'false',
            pixelScale:255.9,
            fi:function(p,s,d){

                for(var i in p ){ this[i] = p[i];
				}
                if(p['angle']) this.angle=p['angle']*Math.PI/180;
                if(p['intensity']) this.intensity=p['intensity']*Math.PI/180;
                if(p['height']) this.height=p['height']*3/100;
                var w = s.width, h = s.height;
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                incom = this.embossPixel(w,h,incom);
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            embossPixel:function(width,height,inPixels){
                var index = 0;
                var outPixels = new Array(width * height);

                var bumpMapWidth = width;
                var bumpMapHeight = height;
                var bumpPixels = new Array(bumpMapWidth * bumpMapHeight);
                for (var i = 0; i < inPixels.length; i++)
                    bumpPixels[i] = PU.brightness(inPixels[i]);

                var Nx, Ny, Nz, Lx, Ly, Lz, Nz2, NzLz, NdotL;
                var shade, background;

                Lx = parseInt(Math.cos(this.angle) * Math.cos(this.intensity) * this.pixelScale);
                Ly = parseInt(Math.sin(this.angle) * Math.cos(this.intensity) * this.pixelScale);
                Lz = parseInt(Math.sin(this.intensity) * this.pixelScale);

                Nz = parseInt(6 * 255 / this.height);
                Nz2 = Nz * Nz;
                NzLz = Nz * Lz;

                background = Lz;

                var bumpIndex = 0;

                for (var y = 0; y < height; y++, bumpIndex += bumpMapWidth) {
                    var s1 = bumpIndex;
                    var s2 = s1 + bumpMapWidth;
                    var s3 = s2 + bumpMapWidth;

                    for (var x = 0; x < width; x++, s1++, s2++, s3++) {
                        if (y != 0 && y < height-2 && x != 0 && x < width-2) {
                            Nx = bumpPixels[s1-1] + bumpPixels[s2-1] + bumpPixels[s3-1] - bumpPixels[s1+1] - bumpPixels[s2+1] - bumpPixels[s3+1];
                            Ny = bumpPixels[s3-1] + bumpPixels[s3] + bumpPixels[s3+1] - bumpPixels[s1-1] - bumpPixels[s1] - bumpPixels[s1+1];

                            if (Nx == 0 && Ny == 0)
                                shade = background;
                            else if ((NdotL = Nx*Lx + Ny*Ly + NzLz) < 0)
                                shade = 0;
                            else
                                shade = parseInt(NdotL / Math.sqrt(Nx*Nx + Ny*Ny + Nz2));
                        } else
                            shade = background;

                        if (this.texture=='true') {
                            var rgb = inPixels[index];
                            var a = rgb & 0xff000000;
                            var r = (rgb >> 16) & 0xff;
                            var g = (rgb >> 8) & 0xff;
                            var b = rgb & 0xff;
                            r = (r*shade) >> 8;
                            g = (g*shade) >> 8;
                            b = (b*shade) >> 8;
                            outPixels[index++] = a | (r << 16) | (g << 8) | b;
                        } else
                            outPixels[index++] = 0xff000000 | (shade << 16) | (shade << 8) | shade;
                    }
                }

                return outPixels;
            }
        },
        sparkle:{
            rays:50,
            radius:25,
            'centreX':50,
            'centreY' :50,
            'random':50,
            amount:100,
            color : 0xffffffff,
            rayLengths:new Array(),
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();

                for(var i in p){ this[i] = p[i]; 
				}
                this.centreX = this.centreX*w/100;
                this.centreY = this.centreY*h/100;
                this.rayLengths = new Array(this.rays);
                for(var i = 0;i<this.rays;i++){
                    this.rayLengths[i] = (this.radius + this.random / 100 * this.radius * ImageMath.nrand());
                }
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                //getDataFromCompress(0,0,w,1,row1,0,w,incom,w,h);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.sparkleRGB(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            sparkleRGB:function(x,y,rgb){
                var dx = x-this.centreX;
                var dy = y-this.centreY;
                var dis = dx*dx+ dy*dy;
                var angle = Math.atan2(dy, dx);
                var d = (angle + Math.PI) / (2*Math.PI) * this.rays;
                var i = parseInt(d);
                var f = d - i;

                if (this.radius != 0) {
                    var length = ImageMath.lerp(f, this.rayLengths[(i % this.rays)], this.rayLengths[((i + 1) % this.rays)]);
                    var g = length * length / (dis + 0.001);
                    g = Math.pow(g, (100 - this.amount) / 50);
                    f -= 0.5;

                    f = 1.0 - f * f;
                    f *= g;
                }
                f = ImageMath.imclamp(f, 0, 1);
                return ImageMath.mixColors(f, rgb, this.color);
            }
        },
        threshold:{
            lower: 0,
            upper:255,
            ftcolor:0xffffffff,
            bgcolor:0xff000000,
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();

                for(var i in p){ this[i] = p[i]; 
				}

                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var inpixel = new Array(w);
                //getDataFromCompress(0,0,w,1,row1,0,w,incom,w,h);
                for(var y = 0;y<h;y++){
                    inpixel = ImageMath.getDataFromCompress(0,y,w,1,inpixel,0,w,incom,w,h);
                    for(var x = 0;x<w;x++){
                        inpixel[x] = this.thresholdRGB(x,y,inpixel[x]);
                    }
                    incom = ImageMath.putData2Compress(0,y,w,1,inpixel,0,w,incom,w,h);
                }
                ImageMath.decompress(incom,inp.data);

                in_ctx.putImageData(inp,0,0);
            },
            thresholdRGB:function(x,y,rgb){
                var v = PU.brightness(rgb);
                 var f = ImageMath.smoothStep(this.lower, this.upper, v);
                 return rgb & 0xFF000000 | ImageMath.mixColors(f, this.bgcolor, this.ftcolor) & 0xFFFFFF;
            }
        },
        // transform
        TRANS_ZERO:0,
        TRANS_CLAMP:1,
        TRANS_WRAP :2,
        TRANS_RGB_CLAMP:3,
        TRANS_NEAREST_NEIGHBOUR :0,
        TRANS_BILINEAR:1,
        TRANS_edgeAction: 3,//,//TRANS_RGB_CLAMP,
        TRANS_:{
            edgedic:{
                            'none':0,
                            'clamp':1,
                            'wrap':2,
                            'rgbclamp':3
                        },
            getPixel:function(indata,x,y,w,h,edgeAction){
                if ((x < 0) || (x >= w) || (y < 0) || (y >= h)) {
                    switch(edgeAction){
                        case Alf.TRANS_ZERO:
                        default:
                            return 0;
                        case Alf.TRANS_WRAP:
                            return indata[(ImageMath.mod__ee(y, h) * w) + ImageMath.mod__ee(x, w)];
                        case Alf.TRANS_CLAMP:
                            return indata[(ImageMath.imclamp(y, 0, h-1) * w) + ImageMath.imclamp(x, 0, w-1)];
                        case Alf.TRANS_RGB_CLAMP:
                            return indata[(ImageMath.imclamp(y, 0, h-1) * w) + ImageMath.imclamp(x, 0, w-1)] & 0x00ffffff;
                    }
                }
                return indata[ y*w+x ];
            }
        } ,
        circle:{
            radius:0,
            centreX:50,
            centreY :50,
            height:100,
            angle :0 ,
            rawSpace:[],
            transSpace:[],
            spread:180,
            edgeAction:0,

            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();

                for(var i in p){ this[i] = p[i]; 
				}
                this.centreX = this.centreX*w/100;
                this.centreY = this.centreY*h/100;
                this.spread = this.spread*Math.PI/180;
                this.angle = this.angle*Math.PI/180;
                this.rawSpace = new Rect(0,0,w,h);
                this.transSpace = new Rect(0,0,w,h);
                this.edgeAction=Alf.TRANS_.edgedic[this.edge];

                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                if(this.interpolation == Alf.TRANS_NEAREST_NEIGHBOUR){

                }
//
                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rawSpace.w;
                var outHeight = this.transSpace.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.transSpace.x;
                outY = this.transSpace.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.transSpace.w,1,outPixels,0,w,outcom,w,h);
                }

                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            transformInverse:function(x,y,out,w,h){

                var dx = x - this.centreX;
                var dy = y - this.centreY;
                var theta = Math.atan2(-dy, -dx) + this.angle;
                var r = Math.sqrt(dx * dx + dy * dy);
                theta = ImageMath.mod__ee(theta, 2*Math.PI);
                out[0] = (w * theta / (this.spread + 0.0001));
                out[1] = (h * (1 - (r - this.radius) / (this.height + 0.001)));
            }
        },
        diffuse:{
            scale:1,
            edgeAction:1,
            rs:[],
            ts:[],
            sintable:[],
            costable:[],
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();

                for(var i in p){ this[i] = p[i]; 

				}
                this.sintable = new Array(256);
                this.costable = new Array(256);
                for (var i = 0; i < 256; i++) {
                    var angle = Math.PI*2 * i / 256;
                    this.sintable[i] = this.scale * Math.sin(angle);
                    this.costable[i] = this.scale * Math.cos(angle);
                }

                this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);
                this.edgeAction=Alf.TRANS_.edgedic[this.edge];

                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                if(this.interpolation == Alf.TRANS_NEAREST_NEIGHBOUR){

                }
//
                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }

                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            transformInverse:function(x,y,out,w,h){
                var angle = parseInt(Math.random()*255);
                var dis = Math.random();
                out[0] = (x + dis * this.sintable[angle]);
                out[1] = (y + dis * this.costable[angle]);
            }
        },
        displace:{
            amount:1,
            edgeAction:1,
            rs:[],
            ts:[],
            dw:0,
            dh:0,
            xmap:[],
            ymap:[],
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
                for(var i in p){ this[i] = p[i]; 

				}
                this.dw = w;
                this.dh = h;

                var mapPixels = new Array(this.dw * this.dh);
                ImageMath.getDataFromCompress(0,0,w,h,mapPixels,0,w,incom,w,h);
//                getRGB(dm, 0, 0, this.dw, this.dh, mapPixels);
                this.xmap = new Array(this.dw * this.dh);
                this.ymap = new Array(this.dw * this.dh);

                var i = 0;
                for (var y = 0; y < this.dh; y++) {
                    for (var x = 0; x < this.dw; x++) {
                        var rgb = mapPixels[i];
                        var r = rgb >> 16 & 0xFF;
                        var g = rgb >> 8 & 0xFF;
                        var b = rgb & 0xFF;
                        mapPixels[i] = parseInt((r + g + b) / 8);
                        i++;
                    }
                }

                i = 0;
                for (var y = 0; y < this.dh; y++) {
                    var j1 = (y + this.dh - 1) % this.dh * this.dw;
                    var j2 = y * this.dw;
                    var j3 = (y + 1) % this.dh * this.dw;
                    for (var x = 0; x < this.dw; x++) {
                        var k1 = (x + this.dw - 1) % this.dw;
                        var k2 = x;
                        var k3 = (x + 1) % this.dw;
                        this.xmap[i] = (mapPixels[(k1 + j1)] + mapPixels[(k1 + j2)] + mapPixels[(k1 + j3)] - mapPixels[(k3 + j1)] - mapPixels[(k3 + j2)] - mapPixels[(k3 + j3)]);
                        this.ymap[i] = (mapPixels[(k1 + j3)] + mapPixels[(k2 + j3)] + mapPixels[(k3 + j3)] - mapPixels[(k1 + j1)] - mapPixels[(k2 + j1)] - mapPixels[(k3 + j1)]);
                        i++;
                    }
                }


                this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);
                this.edgeAction=Alf.TRANS_.edgedic[this.edge];
               

                if(this.interpolation == Alf.TRANS_NEAREST_NEIGHBOUR){

                }
    //
                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }
                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            transformInverse:function(x,y,out,w,h){
                var i = y % this.dh * this.dw + x % this.dw;
                out[0] = (x + this.amount * this.xmap[i]);
                out[1] = (y + this.amount * this.ymap[i]);
            }
        } ,
        kaleido:{
            radius:0,
            centreX:50,
            centreY :50,
            height:100,
            angle1 :0 ,
            angle2 :0 ,
            rs:[],
            ts:[],
            side:4,
            edgeAction:0,
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
    
                for(var i in p){ this[i] = p[i];
				
				}
                this.centreX = this.centreX*w/100;
                this.centreY = this.centreY*h/100;
                this.angle1 = (this.angle1-360)*Math.PI/180;
                this.angle2 = (this.angle2-360)*Math.PI/180;
                this.edgeAction=Alf.TRANS_.edgedic[this.edge];

                this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);

                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }
                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            transformInverse:function(x,y,out,w,h){
                var dx = x - this.centreX;
                var dy = y - this.centreY;
                var r = Math.sqrt(dx * dx + dy * dy);
                var theta = Math.atan2(dy, dx) - this.angle1 - this.angle2;
                theta = ImageMath.triangle(theta / Math.PI * this.side * 0.5);
                if (this.radius != 0) {
                var c = Math.cos(theta);
                var radiusc = this.radius / c;
                r = radiusc * ImageMath.triangle(r / radiusc);
                }
                theta += this.angle1;

                out[0] = this.centreX + r * Math.cos(theta);
                out[1] = this.centreY + r * Math.sin(theta);
            }
        },
		marble:{
			xscale:4,
			yscale:4,
			turbul:1,
			edgeAction:1,
			rs:[],
            ts:[],
            sintable:[],
            costable:[],
			fi:function(p,s,d){
				var w = s.width, h = s.height;
                var start = new Date().getTime();

                for(var i in p){ this[i] = p[i]; 
					
				}
                this.sintable = new Array(256);
                this.costable = new Array(256);
                for (var i = 0; i < 256; i++) {
                    var angle = Math.PI*2 * i / 256 * this.turbul;
                    this.sintable[i] = -this.yscale * Math.sin(angle);
                    this.costable[i] = this.yscale * Math.cos(angle);
                }
				this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);
                this.edgeAction=Alf.TRANS_.edgedic[this.edge];


				var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);

                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }

                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
			},
			displacementMap:function(x,y){
				return PU.puclamp(parseInt(127*(1 + Noise.noise2(x/this.xscale,y/this.xscale) )));
			},
			transformInverse:function(x,y,out,w,h){
                var value = this.displacementMap(x, y);
				out[0] = (x + this.sintable[value]);
				out[1] = (y + this.costable[value]);
            }			
		},
        pinch:{
            radius:0,
            radius2:0,
            centreX:50,
            centreY :50,
            amount:1,
            angle :720 ,
            rs:[],
            ts:[],
            side:4,
            edgeAction:0,
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);

                for(var i in p){ this[i] = p[i]; 
//				console.info(i+" value: "+this[i]);
				}
                this.centreX = this.centreX*w/100;
                this.centreY = this.centreY*h/100;
                this.angle = (this.angle-720)*Math.PI/180;
                this.amount = this.amount-1;
                this.edgeAction=Alf.TRANS_.edgedic[this.edge];
                if(this.radius== 0) this.radius=Math.min(this.centreX,this.centreY);
                this.radius2 = this.radius* this.radius;

                this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);
                this.edgeAction=Alf.TRANS_.edgedic[this.edge];
//                console.info('this.edge  '+this.edge +'  this.edgeAction '+ this.edgeAction );

                if(this.interpolation == Alf.TRANS_NEAREST_NEIGHBOUR){

                }
    //
                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }
                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            transformInverse:function(x,y,out){
                var dx = x - this.centreX;
                var dy = y - this.centreY;
                var distance = dx * dx + dy * dy;
                if ((distance > this.radius2) || (distance == 0)) {
                    out[0] = x;
                    out[1] = y;
                }
                else{
                    var d = Math.sqrt(distance / this.radius2);
                    var t = Math.pow(Math.sin(Math.PI * d/2), -this.amount);
                    dx *=t;
                    dy *=t;

                    var e = 1 - d;
                    var a = this.angle * e * e;

                    var s = Math.sin(a);
                    var c = Math.cos(a);

                    out[0] = (this.centreX + c * dx - s * dy);
                    out[1] = (this.centreY + s * dx + c * dy);
                }
            }
        },
        polar:{
            radius:0,
            centreX:50,
            centreY :50,
            type:'rect2polar',//'rect2polar',
            edgeAction:1,
            typedic:{
                'rect2polar':0,
                'polar2rect':1
            },
            rs:[],
            ts:[],
            typeAction:0,
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
//                console.info("polar "+p);
                for(var i in p){ this[i] = p[i]; 
//				console.info(i+" value: "+this[i]);
				}
                this.centreX = this.centreX*w/100;
                this.centreY = this.centreY*h/100;
                this.radius = Math.max(this.centreX,this.centreY);
                this.typeAction=this.typedic[this.type];

                this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);

                if(this.interpolation == Alf.TRANS_NEAREST_NEIGHBOUR){

                }
                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }
                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            sqr:function(x){
                return x*x;
            },
            transformInverse:function(x,y,out,width,height){
                var theta, t;
                var m, xmax, ymax;
                var r = 0;

                switch (this.typeAction) {
                case 0:
                    theta = 0;
                    if (x >= this.centreX) {
                        if (y > this.centreY) {
                            theta = Math.PI - Math.atan((x - this.centreX)/(y - this.centreY));
                            r = Math.sqrt(this.sqr (x - this.centreX) + this.sqr (y - this.centreY));
                        } else if (y < this.centreY) {
                            theta = Math.atan ((x - this.centreX)/(this.centreY - y));
                            r = Math.sqrt (this.sqr (x - this.centreX) + this.sqr (this.centreY - y));
                        } else {
                            theta = Math.PI/2;
                            r = x - this.centreX;
                        }
                    } else if (x < this.centreX) {
                        if (y < this.centreY) {
                            theta = Math.PI*2 - Math.atan (((this.centreX -x))/((this.centreY - y)));
                            r = Math.sqrt (this.sqr (this.centreX - x) + this.sqr (this.centreY - y));
                        } else if (y > this.centreY) {
                            theta = Math.PI + Math.atan (((this.centreX - x))/((y - this.centreY)));
                            r = Math.sqrt (this.sqr (this.centreX - x) + this.sqr (y - this.centreY));
                        } else {
                            theta = 1.5 * Math.PI;
                            r = this.centreX - x;
                        }
                    }
                    if (x != this.centreX)
                        m = Math.abs (((y - this.centreY)) / ((x - this.centreX)));
                    else
                        m = 0;

                    if (m <= (height / width)) {
                        if (x == this.centreX) {
                            xmax = 0;
                            ymax = this.centreY;
                        } else {
                            xmax = this.centreX;
                            ymax = m * xmax;
                        }
                    } else {
                        ymax = this.centreY;
                        xmax = ymax / m;
                    }

                    out[0] = (width-1) - (width - 1)/(Math.PI*2) * theta;
                    out[1] = height * r / this.radius;
                    break;
                case 1:
                    theta = x / width * Math.PI*2;
                    var theta2;

                    if (theta >= 1.5 * Math.PI)
                        theta2 = Math.PI*2 - theta;
                    else if (theta >= Math.PI)
                        theta2 = theta - Math.PI;
                    else if (theta >= 0.5 * Math.PI)
                        theta2 = Math.PI - theta;
                    else
                        theta2 = theta;

                    t = Math.tan(theta2);
                    if (t != 0)
                        m = 1.0 / t;
                    else
                        m = 0;

                    if (m <= (height / width)) {
                        if (theta2 == 0) {
                            xmax = 0;
                            ymax = this.centreY;
                        } else {
                            xmax = this.centreX;
                            ymax = m * xmax;
                        }
                    } else {
                        ymax = this.centreY;
                        xmax = ymax / m;
                    }

                    r = this.radius * (y / height);

                    var nx = -r * Math.sin(theta2);
                    var ny = r * Math.cos(theta2);

                    if (theta >= 1.5 * Math.PI) {
                        out[0] = this.centreX - nx;
                        out[1] = this.centreY - ny;
                    } else if (theta >= Math.PI) {
                        out[0] = this.centreX - nx;
                        out[1] = this.centreY + ny;
                    } else if (theta >= 0.5 * Math.PI) {
                        out[0] = this.centreX + nx;
                        out[1] = this.centreY + ny;
                    } else {
                        out[0] = this.centreX + nx;
                        out[1] = this.centreY - ny;
                    }
                    break;
                }
            }//end transfer
        },
        sphere:{
            radius:100,
            centreX:50,
            centreY :50,
            refra:1.5,
            edgeAction:1,
            a:0,
            b:0,
            a1:0,
            b2:0,
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
 //               console.info("sphere "+p);
                for(var i in p){ this[i] = p[i]; 
//				console.info(i+" value: "+this[i]);
				}
				this.a = this.b = this.radius;
                this.centreX = this.centreX*w/100;
                this.centreY = this.centreY*h/100;
                if(this.a ==0 )this.a = w/2;
                if(this.b ==0) this.b = h/2;
                this.a2 = this.a* this.a;this.b2 = this.b*this.b;

                this.edgeAction=Alf.TRANS_.edgedic[this.edge];

                this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);
    //             console.info('this.edge  '+this.edge +'  this.edgeAction '+ this.edgeAction );
    //
                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }
                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            transformInverse:function(x,y,out,w,h){
                var dx = x - this.centreX;
                var dy = y - this.centreY;
                var x2 = dx * dx;
                var y2 = dy * dy;
                if (y2 >= this.b2 - this.b2 * x2 / this.a2) {
                    out[0] = x;
                    out[1] = y;
                }
                else{
                    var rRefraction = 1 / this.refra;
                    var z = Math.sqrt((1 - x2 / this.a2 - y2 / this.b2) * (this.a * this.b));
                    var z2 = z * z;
                    var xAngle = Math.acos(dx / Math.sqrt(x2 + z2));
                    var angle1 = Math.PI/2 - xAngle;
                    var angle2 = Math.asin(Math.sin(angle1) * rRefraction);
                    angle2 = Math.PI/2 - xAngle - angle2;
                    out[0] = (x - Math.tan(angle2) * z);

                    var yAngle = Math.acos(dy / Math.sqrt(y2 + z2));
                    angle1 = Math.PI/2 - yAngle;
                    angle2 = Math.asin(Math.sin(angle1) * rRefraction);
                    angle2 = Math.PI/2 - yAngle - angle2;
                    out[1] = (y - Math.tan(angle2) * z);
                }
            }
        },
        twirl:{
            radius:100,
            radius2:0,
            centreX:50,
            centreY :50,
            angle:720,
            edgeAction:1,
            fi:function(p,s,d){
                var w = s.width, h = s.height;
                var start = new Date().getTime();
                var in_ctx = s.getContext('2d');
                var inp = in_ctx.getImageData(0,0,w,h);
                var incom = ImageMath.compress(inp.data);
                var outcom = new Array(incom.length);
 //               console.info("twirl "+p);
                for(var i in p){ this[i] = p[i];
//				console.info(i+" value: "+this[i]);
				}
                this.centreX = this.centreX*w/100;
                this.centreY = this.centreY*h/100;
                if(this.radius ==0 )this.radius=Math.min(this.centreX,this.centreY);
                this.radius2=this.radius* this.radius;
//				console.info('this.radius '+this.radius +'this.radius2 ' +this.radius2);
                this.angle = (this.angle-720)*Math.PI/180;


                this.edgeAction=Alf.TRANS_.edgedic[this.edge];

                this.rs = new Rect(0,0,w,h);
                this.ts = new Rect(0,0,w,h);
 //                console.info('this.edge  '+this.edge +'  this.edgeAction '+ this.edgeAction );

                if(this.interpolation == Alf.TRANS_NEAREST_NEIGHBOUR){

                }
    //
                var srcWidth = w;
                var srcHeight = h;
                var srcWidth1 = w-1;
                var srcHeight1 = h-1;
                var outWidth =this.rs.w;
                var outHeight = this.ts.h;
                var outX, outY;
                var index = 0;
                var outPixels = new Array(outWidth);

                outX = this.ts.x;
                outY = this.ts.y;
                var out = new Array(2);

                for (var y = 0; y < outHeight; y++) {
                    for (var x = 0; x < outWidth; x++) {
                        this.transformInverse(outX+x, outY+y, out,w,h);
                        var srcX = parseInt(Math.floor( out[0] ));
                        var srcY = parseInt(Math.floor( out[1] ));
                        var xWeight = out[0]-srcX;
                        var yWeight = out[1]-srcY;
                        var nw, ne, sw, se;

                        if ( srcX >= 0 && srcX < srcWidth1 && srcY >= 0 && srcY < srcHeight1) {
                            // Easy case, all corners are in the image
                            var i = srcWidth*srcY + srcX;
                            nw = incom[i];
                            ne = incom[i+1];
                            sw = incom[i+srcWidth];
                            se = incom[i+srcWidth+1];
                        } else {
                            // Some of the corners are off the image
                            nw = Alf.TRANS_.getPixel( incom, srcX, srcY, srcWidth, srcHeight,this.edgeAction );
                            ne = Alf.TRANS_.getPixel( incom, srcX+1, srcY, srcWidth, srcHeight,this.edgeAction );
                            sw = Alf.TRANS_.getPixel( incom, srcX, srcY+1, srcWidth, srcHeight,this.edgeAction);
                            se = Alf.TRANS_.getPixel( incom, srcX+1, srcY+1, srcWidth, srcHeight,this.edgeAction);
                        }
                        outPixels[x] = ImageMath.bilinearInterpolate(xWeight, yWeight, nw, ne, sw, se);
                    }
                    outcom = ImageMath.putData2Compress(0,y,this.ts.w,1,outPixels,0,w,outcom,w,h);
                }
                ImageMath.decompress(outcom,inp.data);
                in_ctx.putImageData(inp,0,0);
            },
            transformInverse:function(x,y,out,w,h){
                var dx = x - this.centreX;
                var dy = y - this.centreY;
                var distance = dx * dx + dy * dy;
                if (distance > this.radius2) {
                    out[0] = x;
                    out[1] = y;
                }
                else{
                    distance = Math.sqrt(distance);
                    var a = Math.atan2(dy, dx) + this.angle * (this.radius - distance) / this.radius;
                    out[0] = this.centreX + distance * Math.cos(a);
                    out[1] = this.centreY + distance * Math.sin(a);
                }
            }
        }
   };

    Noise={
		B:0x100,
		BM:0xff,
		N:0x1000,
		p:new Array(512+2),
		g3:new Array(512+2),
		g2:new Array(512+2),
		g1:new Array(512+2),
		s:true,
        noise2:function(x,y){
			var bx0, bx1, by0, by1, b00, b10, b01, b11;
			var rx0, rx1, ry0, ry1,  sx, sy, a, b, t, u, v;
			var i, j;
			var q = [];

			if (this.s) {
				this.s = false;
				this.initnis();
			}

			t = x + this.N;
			bx0 = parseInt(t) & this.BM;
			bx1 = (bx0+1) & this.BM;
			rx0 = t - parseInt(t);
			rx1 = rx0 - 1;
		
			t = y + this.N;
			by0 = parseInt(t) & this.BM;
			by1 = (by0+1) & this.BM;
			ry0 = t - parseInt(t);
			ry1 = ry0 - 1;
		
			i = this.p[bx0];
			j = this.p[bx1];

			b00 = this.p[i + by0];
			b10 = this.p[j + by0];
			b01 = this.p[i + by1];
			b11 = this.p[j + by1];

			sx = this.s_Curve(rx0);
			sy = this.s_Curve(ry0);

			q = this.g2[b00]; u = rx0 * q[0] + ry0 * q[1];
			q = this.g2[b10]; v = rx1 * q[0] + ry0 * q[1];
			a = this.lerp(sx, u, v);

			q = this.g2[b01]; u = rx0 * q[0] + ry1 * q[1];
			q = this.g2[b11]; v = rx1 * q[0] + ry1 * q[1];
			b = this.lerp(sx, u, v);

			return 1.5*this.lerp(sy, a, b);
        },
		initnis:function(){
			var i, j, k;
			for(i = 0;i<512+2;i++){
				this.g3[i]= new Array(3);
				this.g2[i] = new Array(2);
			}
			for (i = 0; i < this.B; i++) {
				this.p[i] = i;

				this.g1[i] = (Math.random()-0.5)*2;

				for (j = 0; j < 2; j++)
					this.g2[i][j] = (Math.random()-0.5)*2;
				this.normalize2(this.g2[i]);

				for (j = 0; j < 3; j++)
					this.g3[i][j] = (Math.random()-0.5)*2;
				this.normalize3(this.g3[i]);
			}

			for (i = this.B-1; i >= 0; i--) {
				k = this.p[i];
				this.p[i] = this.p[j =parseInt( Math.random() * this.B)];
				this.p[j] = k;
			}

			for (i = 0; i < this.B + 2; i++) {
				this.p[this.B + i] = this.p[i];
				this.g1[this.B + i] = this.g1[i];
				for (j = 0; j < 2; j++)
					this.g2[this.B + i][j] = this.g2[i][j];
				for (j = 0; j < 3; j++)
					this.g3[this.B + i][j] = this.g3[i][j];
			}
		},
		normalize2:function(v){
			var d = Math.sqrt(v[0]*v[0]+ v[1]*v[1]);
			v[0] /=d;
			v[1] /= d;
		},
		normalize3:function(v){
			var d = Math.sqrt(v[0]*v[0]+ v[1]*v[1] + v[2]*v[2]);
			v[0] /=d;
			v[1] /= d;
			v[2] /= d;
		},
		s_Curve:function(t){
			return t * t * (3 - 2 * t);
		},
		lerp:function(t,a,b){
			return a + t * (b - a);
		}
    };


    ImageMath = {
     compress: function(inarray){
         var ca = new Array((inarray.length)/4);
         for(var i= 0;i<ca.length;i++){
             ca[i] = inarray[i*4]<<16 | inarray[i*4+1]<< 8| inarray[i*4+2]| inarray[i*4+3]<<24;
         }
         return ca;
     },
     decompress:function(inarray,outarray){
         for(var i= 0,n= inarray.length; i<n; i++)
         {
             outarray[i*4] = inarray[i]>>16 & 0xFF;
             outarray[i*4+1] = inarray[i]>>8 & 0xFF;
             outarray[i*4+2] = inarray[i] & 0xFF;
             outarray[i*4+3] = inarray[i]>>24 & 0xFF;
         }
     },
     /**
      * 从压缩的数据源里取数据。从srcdata里面的(startX,startY)开始，取出w,h的矩形的数据，
      * @param offset 相对应于outdata的offset
      */
     getDataFromCompress:function(startX,startY,w,h,outdata,offset,scansize,srcdata,iw,ih){
         var yoff = offset;var off = 0;
         for(var y=startY; y<startY+h;y++,yoff +=scansize){
             off = yoff;
             for(var x = startX;x<startX+w;x++){
                 outdata[off++]=srcdata[x+iw*y];
             }
         }
         return outdata;
     },
     putData2Compress:function(startX,startY,w,h,rgb,offset,scansize,outdata,iw,ih){
         var yoff = offset, off = 0;
         for(var y = startY; y<startY+h;y++,yoff+=scansize){
             off = yoff;
             for(var x = startX;x<startX+w;x++){
                outdata[x+iw*y] = rgb[off++];
             }
         }
         return outdata;
     },
     imbias: function(a,b){
         return a /(( 1/b -2) *(1 -a) + 1);
     },
     imgain: function(a,b){
         var c = (1/b -2)* (1-2*a);
         if(a < 0.5)
             return a/(c +1);
         return (c -a)/(c-1);
     },
     step:function(a,x){
         return x< a? 0:1;
     },
     pulse:function(a,b,x){
         return (x<a) || (x>b)?0:1;
     },
     smoothPuls:function(a1,a2,b1,b2,x){
         if ((x < a1) || (x >= b2)) return 0;
         if (x >= a2) {
                if (x < b1)
                  return 1;
                x = (x - b1) / (b2 - b1);
                return 1 - x * x * (3 - 2 * x);
         }
         x = (x - a1) / (a2 - a1);
         return x * x * (3 - 2 * x);
     },
     smoothStep:function(a,b,x){
         if (x < a) return 0;
         if(x >=b )return 1;
         x = (x - a) / (b - a);
         return x * x * (3 - 2 * x);
     },
     circleUp:function(x){
         x = 1-x;
         return Math.sqrt(1- x*x);
     },
     circleDown:function(x){
         return 1 - Math.sqrt(1-x*x);
     },
     imclamp: function(x,a,b){
         return x > b ? b : x < a ? a : x;
     },
     mod__ee:function(a,b){
         var n = parseInt(a/b);
         a -= n*b;
         if(a<0) return a+b;
         return a;
     },
     lerp:function(t,a,b){
         return a + t * (b - a);
     },
     lerpInt:function(t,a,b){
              return parseInt(a + t * (b - a));
          },
     triangle:function(x){
         var r = ImageMath.mod__ee(x,1);
         return 2 * (r < 0.5 ? r : 1 - r);
     },
     mixColors:function(t,rgb1,rgb2){
        var a1 = rgb1 >> 24 & 0xFF;
         var r1 = rgb1 >> 16 & 0xFF;
         var g1 = rgb1 >> 8 & 0xFF;
         var b1 = rgb1 & 0xFF;
         var a2 = rgb2 >> 24 & 0xFF;
         var r2 = rgb2 >> 16 & 0xFF;
         var g2 = rgb2 >> 8 & 0xFF;
         var b2 = rgb2 & 0xFF;
        a1 = ImageMath.lerpInt(t, a1, a2);
        r1 = ImageMath.lerpInt(t, r1, r2);
        g1 = ImageMath.lerpInt(t, g1, g2);
        b1 = ImageMath.lerpInt(t, b1, b2);
        return a1 << 24 | r1 << 16 | g1 << 8 | b1;
     },
     premultiply: function(p,offset,len)
     {
         len += offset;
         for(var i = offset; i< len; i++){
             var rgb = p[i];
             var a = rgb >> 24 & 0xff;
             var r = rgb >> 16 & 0xff;
             var g = rgb >> 8 & 0xff;
             var b = rgb & 0xff;
             var f = a/255.0;
             r = parseInt(r *f);
             g = parseInt(g *f);
             b = parseInt(b *f);
             p[i] = (a << 24 | r << 16 | g << 8| b);
         }
     },
     unpremultiply: function(p,offset,len){
         len += offset;
         for(var i = offset; i< len; i++){
             var rgb = p[i];
             var a = rgb >> 24 & 0xff;
             var r = rgb >> 16 & 0xff;
             var g = rgb >> 8 & 0xff;
             var b = rgb & 0xff;
             if(a != 0 && a != 255){
                 var f = 255.0/a;
                 r = parseInt(r * f);
                 g = parseInt(g * f);
                 b = parseInt(b * f);
                 if(r > 255) r = 255;
                 if(g > 255) g = 255;
                 if(b > 255) b = 255;
                 p[i] = (a << 24 | r <<16 |g << 8 |b);
             }
         }
     } ,

     RGB2HSB:function(r,g,b){
          var hue, saturation, brightness;
          var cmax = (r > g) ? r : g;
          if (b > cmax) cmax = b;
          var cmin = (r < g) ? r : g;
          if (b < cmin) cmin = b;

          brightness =  cmax / 255;
          if (cmax != 0)
              saturation =(cmax - cmin)/cmax;
          else
              saturation = 0;
          if (saturation == 0) hue = 0;
          else {
              var redc =  (cmax - r) /  (cmax - cmin);
              var greenc =  (cmax - g) /  (cmax - cmin);
              var bluec =  (cmax - b) /  (cmax - cmin);
              if (r == cmax)
                  hue = bluec - greenc;
              else if (g == cmax)
                  hue = 2 + redc - bluec;
              else
                 hue = 4 + greenc - redc;
              hue = hue / 6;
              if (hue < 0)
                  hue = hue + 1;
          }
          return [hue,saturation,brightness];
     },
     HSB2RGB:function(hue,saturation,brightness){
          var r = 0, g = 0, b = 0;
          if (saturation == 0) {
             r = g = b = Math.round(brightness * 255 + 0.5);
          } else {
              var h = (hue - Math.floor(hue)) * 6.0;
              var f = h - Math.floor(h);
              var p = brightness * (1 - saturation);
              var q = brightness * (1 - saturation * f);
              var t = brightness * (1 - (saturation * (1 - f)));
        //            switch (Math.round(h))
            switch (parseInt(h))
            {
             case 0:
             r = parseInt(brightness * 255 + 0.5);
             g = parseInt (t * 255 + 0.5);
             b = parseInt (p * 255 + 0.5);
             break;
             case 1:
             r = parseInt(q * 255 + 0.5);
             g = parseInt(brightness * 255 + 0.5);
             b = parseInt(p * 255 + 0.5);
             break;
             case 2:
             r = parseInt(p * 255 + 0.5);
             g = parseInt(brightness * 255 + 0.5);
             b = parseInt(t * 255 + 0.5);
             break;
             case 3:
             r = parseInt(p * 255 + 0.5);
             g = parseInt(q * 255 + 0.5);
             b = parseInt(brightness * 255 + 0.5);
             break;
             case 4:
             r = parseInt (t * 255 + 0.5);
             g = parseInt(p * 255 + 0.5);
             b = parseInt(brightness * 255 + 0.5);
             break;
             case 5:
             r = parseInt(brightness * 255 + 0.5);
             g = parseInt (p * 255 + 0.5);
             b = parseInt (q * 255 + 0.5);
             break;
             }
         }
         return 0xff000000 | (r << 16) | (g << 8) | (b << 0);

        },
     nrand:function(){
         var x1, x2, rad, y1;
        do {
            x1 = 2 * Math.random() - 1;
            x2 = 2 * Math.random() - 1;
            rad = x1 * x1 + x2 * x2;
        } while(rad >= 1 || rad == 0);
        var c = Math.sqrt(-2 * Math.log(rad) / rad);

        return x1 * c;
     },
     bilinearInterpolate:function(x, y, nw, ne, sw, se){
        var a0 = nw >> 24 & 0xFF;
         var r0 = nw >> 16 & 0xFF;
         var g0 = nw >> 8 & 0xFF;
         var b0 = nw & 0xFF;
         var a1 = ne >> 24 & 0xFF;
         var r1 = ne >> 16 & 0xFF;
         var g1 = ne >> 8 & 0xFF;
         var b1 = ne & 0xFF;
         var a2 = sw >> 24 & 0xFF;
         var r2 = sw >> 16 & 0xFF;
         var g2 = sw >> 8 & 0xFF;
         var b2 = sw & 0xFF;
         var a3 = se >> 24 & 0xFF;
         var r3 = se >> 16 & 0xFF;
         var g3 = se >> 8 & 0xFF;
         var b3 = se & 0xFF;

         var cx = 1 - x;
         var cy = 1 - y;

         var m0 = cx * a0 + x * a1;
         var m1 = cx * a2 + x * a3;
         var a = parseInt(cy * m0 + y * m1);

        m0 = cx * r0 + x * r1;
        m1 = cx * r2 + x * r3;
         var r = parseInt(cy * m0 + y * m1);

        m0 = cx * g0 + x * g1;
        m1 = cx * g2 + x * g3;
         var g = parseInt(cy * m0 + y * m1);

        m0 = cx * b0 + x * b1;
        m1 = cx * b2 + x * b3;
         var b = parseInt(cy * m0 + y * m1);

        return a << 24 | r << 16 | g << 8 | b;
    }
    } ;
    //pixelUtils
    PU = {
         REPLACE : 0,
         NORMAL : 1,
         MIN : 2,
         MAX : 3,
         ADD : 4,
         SUBTRACT : 5,
         DIFFERENCE : 6,
         MULTIPLY : 7,
         HUE : 8,
         SATURATION : 9,
         VALUE : 10,
         COLOR : 11,
         SCREEN : 12,
         AVERAGE : 13,
         OVERLAY : 14,
         CLEAR : 15,
         EXCHANGE : 16,
         DISSOLVE : 17,
         DST_IN : 18,
         ALPHA : 19,
         ALPHA_TO_GRAY : 20,
         'disass':function(rgb){
             var a = rgb>>24 &0xff;
             var r = rgb>>16 &0xff;
             var g = rgb>>8 &0xff;
             var b = rgb &0xff;
             return [a,r,g,b];
         },
         'ass':function(a,r,g,b){
             return (a << 24 | r <<16 |g << 8 |b);
         },
         'assArray':function(arr){
             return (arr[0] << 24 | arr[1] <<16 |arr[2] << 8 |arr[3]);
         },
         puclamp:function(c){
             if(c<0) return 0;
             else if(c>255) return 255;
             else return c;
         },
         interpolate:function(v1,v2,f){
             return PU.puclamp(parseInt(v1+f*(v2-v1)));
         }
         ,
         brightness:function(rgb){
             var re = PU.disass(rgb);
             return parseInt((re[1]+re[2]+re[3])/3);
         },
         nearColors:function(rgb1,rgb2,tolerance){
             var re1 = PU.disass(rgb1);
             var re2 = PU.disass(rgb2);
             return (Math.abs(re1[1]-re2[1])<=tolerance )&& (Math.abs(re1[2]-re2[2])<=tolerance)&&(Math.abs(re1[3]-re2[3])<=tolerance);
         },
         combinePixels:function(c1,c2,op,extraalpha){
            if(op == 0) return c1;
    //        console.info('############# PU.combinePixels have NOT finished  ##############');
             if (op == PU.REPLACE)
                return c1;
            var a1 = (c1 >> 24) & 0xff;
             var r1 = (c1 >> 16) & 0xff;
             var g1 = (c1 >> 8) & 0xff;
             var b1 = c1 & 0xff;
             var a2 = (c2 >> 24) & 0xff;
             var r2 = (c2 >> 16) & 0xff;
             var g2 = (c2 >> 8) & 0xff;
             var b2 = c2 & 0xff;

            switch (op) {
            case PU.NORMAL:
                break;
            case PU.MIN:
                r1 = Math.min(r1, r2);
                g1 = Math.min(g1, g2);
                b1 = Math.min(b1, b2);
                break;
            case PU.MAX:
                r1 = Math.max(r1, r2);
                g1 = Math.max(g1, g2);
                b1 = Math.max(b1, b2);
                break;
            case PU.ADD:
                r1 = PU.puclamp(r1+r2);
                g1 = PU.puclamp(g1+g2);
                b1 = PU.puclamp(b1+b2);
                break;
            case PU.SUBTRACT:
                r1 = PU.puclamp(r2-r1);
                g1 = PU.puclamp(g2-g1);
                b1 = PU.puclamp(b2-b1);
                break;
            case PU.DIFFERENCE:
                r1 = PU.puclamp(Math.abs(r1-r2));
                g1 = PU.puclamp(Math.abs(g1-g2));
                b1 = PU.puclamp(Math.abs(b1-b2));
                break;
            case PU.MULTIPLY:
                r1 = PU.puclamp(r1*r2/255);
                g1 = PU.puclamp(g1*g2/255);
                b1 = PU.puclamp(b1*b2/255);
                break;
            case PU.DISSOLVE:
                console.info("this clause is NOT finish");
                break;
            case PU.AVERAGE:
                r1 = parseInt((r1+r2)/2);
                g1 = parseInt((g1+g2)/2);
                b1 = parseInt((b1+b2)/2);
                break;
            case PU.HUE:
            case PU.SATURATION:
            case PU.VALUE:
            case PU.COLOR:
                console.info("this clause is NOT finish");
                ImageMath.RGB2HSB(r1, g1, b1, hsb1);
                ImageMath.RGB2HSB(r2, g2, b2, hsb2);
                switch (op) {
                case HUE:
                    hsb2[0] = hsb1[0];
                    break;
                case SATURATION:
                    hsb2[1] = hsb1[1];
                    break;
                case VALUE:
                    hsb2[2] = hsb1[2];
                    break;
                case COLOR:
                    hsb2[0] = hsb1[0];
                    hsb2[1] = hsb1[1];
                    break;
                }
                c1 = ImageMath.HSB2RGB(hsb2[0], hsb2[1], hsb2[2]);
                r1 = (rgb1 >> 16) & 0xff;
                g1 = (rgb1 >> 8) & 0xff;
                b1 = rgb1 & 0xff;
                break;
            case PU.SCREEN:
                r1 = 255 - ((255 - r1) * (255 - r2)) / 255;
                g1 = 255 - ((255 - g1) * (255 - g2)) / 255;
                b1 = 255 - ((255 - b1) * (255 - b2)) / 255;
                break;
            case PU.OVERLAY:
                var m, s;
                s = 255 - ((255 - r1) * (255 - r2)) / 255;
                m = r1 * r2 / 255;
                r1 = (s * r1 + m * (255 - r1)) / 255;
                s = 255 - ((255 - g1) * (255 - g2)) / 255;
                m = g1 * g2 / 255;
                g1 = (s * g1 + m * (255 - g1)) / 255;
                s = 255 - ((255 - b1) * (255 - b2)) / 255;
                m = b1 * b2 / 255;
                b1 = (s * b1 + m * (255 - b1)) / 255;
                break;
            case PU.CLEAR:
                r1 = g1 = b1 = 0xff;
                break;
            case PU.DST_IN:
                r1 = PU.puclamp((r2*a1)/255);
                g1 = PU.puclamp((g2*a1)/255);
                b1 = PU.puclamp((b2*a1)/255);
                a1 = PU.puclamp((a2*a1)/255);
                return (a1 << 24) | (r1 << 16) | (g1 << 8) | b1;
            case PU.ALPHA:
                a1 = a1*a2/255;
                return (a1 << 24) | (r2 << 16) | (g2 << 8) | b2;
            case PU.ALPHA_TO_GRAY:
                var na = 255-a1;
                return (a1 << 24) | (na << 16) | (na << 8) | na;
            }
            if (extraalpha != 0xff || a1 != 0xff) {
                a1 = a1*extraalpha/255;
                var a3 = (255-a1)*a2/255;
                r1 = PU.puclamp((r1*a1+r2*a3)/255);
                g1 = PU.puclamp((g1*a1+g2*a3)/255);
                b1 = PU.puclamp((b1*a1+b2*a3)/255);
                a1 = PU.puclamp(a1+a3);
            }
            return (a1 << 24) | (r1 << 16) | (g1 << 8) | b1;

         }
     };
    fft ={
        init:function(logN)
        {
            this.w1=new Array(logN);
            this.w2=new Array(logN);
            this.w3=new Array(logN);
            var N = 1;
            for(var k=0;k<logN;k++)
            {
                N = N<<1;
                var angle = -2*Math.PI/N;
                fft['w1'][k]=Math.sin(0.5*angle);
                fft['w2'][k]=-2* fft['w1'][k]* fft['w1'][k];
                fft['w3'][k]=Math.sin(angle);
            }
        },
        //对于数组的拷贝 对于webkit, 使用concat; 其他浏览器, 使用 concat
        transform2D:function(real,imag,cols,rows,forward){
		var start = new Date().getTime();
            var log2cols =this.log2(cols);
            var log2rows =this.log2(rows);
            var n = Math.max(rows,cols);
            var rtemp = new Array(n);
            var itemp = new Array(n);
            for(var y = 0;y<rows;y++)
            {
                var offset = y*cols;
                rtemp = real.slice(offset,offset+cols);
                itemp = imag.slice(offset,offset+cols);
                this.transform1D(rtemp,itemp,log2cols,cols,forward);
	            var ss1 = [],ss2=[];
                real = ss1.concat(real.slice(0,offset),rtemp,real.slice(offset+cols));
                imag = ss2.concat(imag.slice(0,offset),itemp,imag.slice(offset+cols));
            }
            for(var x = 0;x<cols;x++)
            {
                var index = x;
                for(var y = 0;y< rows;y++)
                {
                    rtemp[y] = real[index];
                    itemp[y] = imag[index];
                    index += cols;
                }
                this.transform1D(rtemp,itemp,log2rows,rows,forward);
                index = x;
                for(var y = 0;y<rows;y++)
                {
                    real[index] = rtemp[y];
                    imag[index] = itemp[y];
                    index += cols;
                }
            }
			return [real,imag];
        },
        log2:function(n){
            var m =1;
            var log2n =0;
            while(m<n){
                m<<=1;
                log2n++;
            }
            return m==n?log2n:-1;
        },

        transform1D:function(real,imag,logN,n,forward,offset,len){

			if(!offset) {offset = 0;len = 0}
            this.scramble(n,real,imag,offset,len);
            this.bufferflies(n,logN,forward?1:-1,real,imag,offset,len);
        },
        scramble:function(n,real,imag,offset,len)
        {
            var j = 0;
            for(var i=0;i<n;i++)
            {
                if(i>j)
                {
                    var t = real[j+offset];
                    real[j+offset] = real[i+offset];
                    real[i+offset] = t;
                    t = imag[j+offset];
                    imag[j+offset] = imag[i+offset];
                    imag[i+offset] = t;
                }
                var m = n>>1;
                while((j >= m) && (m >= 2))
                {
                    j -= m;
                    m >>=1;
                }
                j += m;
            }
        }   ,
        /**
         * 为real imag数组赋值
         * @param n
         * @param logN
         * @param direction
         * @param real
         * @param imag
         */
        bufferflies:function(n,logN,direction,real,imag,begin,len){
            var N = 1;
            for(var k = 0;k<logN;k++)
            {
                var w_re,w_im,wp_re,wp_im,temp_re,temp_im,wt;
                var half_N = N;
                N<<=1;
                wt = direction*this.w1[k];
                wp_re =fft['w2'][k];
                wp_im =direction*fft['w3'][k];
                w_re = 1;  w_im = 0;
                for(var offset=0;offset<half_N;offset++)
                {
                    for(var i=offset;i<n;i+=N)
                    {
                        var j = i+half_N;
                        var re = real[j+begin];
                        var im = imag[j+begin];
                        temp_re = (w_re * re) - (w_im * im);
                        temp_im = (w_im * re) + (w_re * im);
                        real[j+begin] = real[i+begin] - temp_re;
                        real[i+begin] = real[i+begin] + temp_re;
                        imag[j+begin] = imag[i+begin] - temp_im;
                        imag[i+begin] = imag[i+begin] + temp_im;
                    }
                    wt = w_re;
                    w_re = wt * wp_re - w_im * wp_im + w_re;
                    w_im = w_im * wp_re + wt * wp_im + w_im;
                }
            }
            if ( direction == -1 ) {
                var nr = 1/n;
                for(var i = 0;i<n;i++){
                    real[i]=nr*real[i+begin];
                    imag[i]=nr*imag[i+begin];
                }
            }
        }//,
    }//;


}();