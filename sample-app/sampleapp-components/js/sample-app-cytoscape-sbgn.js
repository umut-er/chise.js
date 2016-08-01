var sbgnStyleSheet = cytoscape.stylesheet()
    .selector("node")
    .css({
      'border-width': 1.5,
      'border-color': '#555',
      'background-color': '#f6f6f6',
      'font-size': 11,
//          'shape': 'data(sbgnclass)',
      'background-opacity': 0.5,
      'text-opacity': 1,
      'opacity': 1
    })
    .selector("node[?sbgnclonemarker][sbgnclass='perturbing agent']")
    .css({
      'background-image': 'sampleapp-images/clone_bg.png',
      'background-position-x': '50%',
      'background-position-y': '100%',
      'background-width': '100%',
      'background-height': '25%',
      'background-fit': 'none',
      'background-image-opacity': function (ele) {
        if(!ele.data('sbgnclonemarker')){
          return 0;
        }
        return ele._private.style['background-opacity'].value;
      }
    })
    .selector("node[sbgnclass][sbgnclass!='complex'][sbgnclass!='process'][sbgnclass!='association'][sbgnclass!='dissociation'][sbgnclass!='compartment'][sbgnclass!='source and sink']")
    .css({
//          'content': 'data(sbgnlabel)',
      'content': function (ele) {
        return getElementContent(ele);
      },
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': function (ele) {
        return getLabelTextSize(ele);
      }
    })
    .selector("node[sbgnclass]")
    .css({
      'shape': function (ele) {
        return getCyShape(ele);
      }
    })
    .selector("node[sbgnclass='perturbing agent']")
    .css({
      'shape-polygon-points': '-1, -1,   -0.5, 0,  -1, 1,   1, 1,   0.5, 0, 1, -1'
    })
    .selector("node[sbgnclass='association']")
    .css({
      'background-color': '#6B6B6B'
    })
    .selector("node[sbgnclass='tag']")
    .css({
      'shape-polygon-points': '-1, -1,   0.25, -1,   1, 0,    0.25, 1,    -1, 1'
    })
    .selector("node[sbgnclass='complex']")
    .css({
      'background-color': '#F4F3EE',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': function (ele) {
        return getLabelTextSize(ele);
      },
      'width': function(ele){
        if(ele.children() == null || ele.children().length == 0){
          return '36';
        }
        return ele.data('width');
      },
      'height': function(ele){
        if(ele.children() == null || ele.children().length == 0){
          return '36';
        }
        return ele.data('height');
      },
      'content': function(ele){
        return getElementContent(ele);
      }
    })
    .selector("node[sbgnclass='compartment']")
    .css({
      'border-width': 3.75,
      'background-opacity': 0,
      'background-color': '#FFFFFF',
      'content': function(ele){
        return getElementContent(ele);
      },
      'width': function(ele){
        if(ele.children() == null || ele.children().length == 0){
          return '36';
        }
        return ele.data('width');
      },
      'height': function(ele){
        if(ele.children() == null || ele.children().length == 0){
          return '36';
        }
        return ele.data('height');
      },
      'text-valign': 'bottom',
      'text-halign': 'center',
      'font-size': function (ele) {
        return getLabelTextSize(ele);
      }
    })
    .selector("node[sbgnclass][sbgnclass!='complex'][sbgnclass!='compartment'][sbgnclass!='submap']")
    .css({
      'width': 'data(sbgnbbox.w)',
      'height': 'data(sbgnbbox.h)'
    })
    .selector("node:selected")
    .css({
      'border-color': '#d67614',
      'target-arrow-color': '#000',
      'text-outline-color': '#000'})
    .selector("node:active")
    .css({
      'background-opacity': 0.7, 'overlay-color': '#d67614',
      'overlay-padding': '14'
    })
    .selector("edge")
    .css({
      'curve-style': 'bezier',
      'line-color': '#555',
      'target-arrow-fill': 'hollow',
      'source-arrow-fill': 'hollow',
      'width': 1.5,
      'target-arrow-color': '#555',
      'source-arrow-color': '#555',
//          'target-arrow-shape': 'data(sbgnclass)'
    })
    .selector("edge[sbgnclass]")
    .css({
      'target-arrow-shape': function (ele) {
        return getCyArrowShape(ele);
      },
      'source-arrow-shape': 'none'
    })
    .selector("edge[sbgnclass='inhibition']")
    .css({
      'target-arrow-fill': 'filled'
    })
    .selector("edge[sbgnclass='consumption']")
    .css({
      'line-style': 'consumption'
    })
    .selector("edge[sbgnclass='production']")
    .css({
      'target-arrow-fill': 'filled',
      'line-style': 'production'
    })
    .selector("edge:selected")
    .css({
      'line-color': '#d67614',
      'source-arrow-color': '#d67614',
      'target-arrow-color': '#d67614'
    })
    .selector("edge:active")
    .css({
      'background-opacity': 0.7, 'overlay-color': '#d67614',
      'overlay-padding': '8'
    })
    .selector("core")
    .css({
      'selection-box-color': '#d67614',
      'selection-box-opacity': '0.2', 'selection-box-border-color': '#d67614'
    })
    .selector(".ui-cytoscape-edgehandles-source")
    .css({
      'border-color': '#5CC2ED',
      'border-width': 3
    })
    .selector(".ui-cytoscape-edgehandles-target, node.ui-cytoscape-edgehandles-preview")
    .css({
      'background-color': '#5CC2ED'
    })
    .selector("edge.ui-cytoscape-edgehandles-preview")
    .css({
      'line-color': '#5CC2ED'
    })
    .selector("node.ui-cytoscape-edgehandles-preview, node.intermediate")
    .css({
      'shape': 'rectangle',
      'width': 15,
      'height': 15
    })
    .selector('edge.not-highlighted')
    .css({
      'opacity': 0.3,
      'text-opacity': 0.3,
      'background-opacity': 0.3
    })
    .selector('node.not-highlighted')
    .css({
      'border-opacity': 0.3,
      'text-opacity': 0.3,
      'background-opacity': 0.3
    })
    .selector('edge.meta')
    .css({
      'line-color': '#C4C4C4',
      'source-arrow-color': '#C4C4C4',
      'target-arrow-color': '#C4C4C4'
    })
    .selector("edge.meta:selected")
    .css({
      'line-color': '#d67614',
      'source-arrow-color': '#d67614',
      'target-arrow-color': '#d67614'
    })
    .selector("node.changeBackgroundOpacity")
    .css({
      'background-opacity': 'data(backgroundOpacity)'
    })
    .selector("node.changeLabelTextSize")
    .css({
      'font-size': function (ele) {
        return getLabelTextSize(ele);
      }
    })
    .selector("node.changeContent")
    .css({
      'content': function (ele) {
        return getElementContent(ele);
      }
    })
    .selector("node.changeBorderColor")
    .css({
      'border-color': 'data(borderColor)'
    })
    .selector("node.changeBorderColor:selected")
    .css({
      'border-color': '#d67614'
    })
    .selector("edge.changeLineColor")
    .css({
      'line-color': 'data(lineColor)',
      'source-arrow-color': 'data(lineColor)',
      'target-arrow-color': 'data(lineColor)'
    })
    .selector("edge.changeLineColor:selected")
    .css({
      'line-color': '#d67614',
      'source-arrow-color': '#d67614',
      'target-arrow-color': '#d67614'
    })
    .selector('edge.changeLineColor.meta')
    .css({
      'line-color': '#C4C4C4',
      'source-arrow-color': '#C4C4C4',
      'target-arrow-color': '#C4C4C4'
    })
    .selector("edge.changeLineColor.meta:selected")
    .css({
      'line-color': '#d67614',
      'source-arrow-color': '#d67614',
      'target-arrow-color': '#d67614'
    }).selector("node.changeClonedStatus")
    .css({
      'background-image-opacity': function (ele) {
        if(!ele.data('sbgnclonemarker')){
          return 0;
        }
        return ele._private.style['background-opacity'].value;
      }
    });
// end of sbgnStyleSheet

var NotyView = Backbone.View.extend({
  render: function () {
    //this.model["theme"] = " twitter bootstrap";
    this.model["layout"] = "bottomRight";
    this.model["timeout"] = 8000;
    this.model["text"] = "Right click on a gene to see its details!";

    noty(this.model);
    return this;
  }
});

var SBGNContainer = Backbone.View.extend({
  cyStyle: sbgnStyleSheet,
  render: function () {
    (new NotyView({
      template: "#noty-info",
      model: {}
    })).render();

    var container = $(this.el);
    // container.html("");
    // container.append(_.template($("#loading-template").html()));


    var cytoscapeJsGraph = (this.model.cytoscapeJsGraph);

    var positionMap = {};
    //add position information to data for preset layout
    for (var i = 0; i < cytoscapeJsGraph.nodes.length; i++) {
      var xPos = cytoscapeJsGraph.nodes[i].data.sbgnbbox.x;
      var yPos = cytoscapeJsGraph.nodes[i].data.sbgnbbox.y;
      positionMap[cytoscapeJsGraph.nodes[i].data.id] = {'x': xPos, 'y': yPos};
    }

    var cyOptions = {
      elements: cytoscapeJsGraph,
      style: sbgnStyleSheet,
      layout: {
        name: 'preset',
        positions: positionMap
      },
      showOverlay: false, minZoom: 0.125, maxZoom: 16,
      boxSelectionEnabled: true,
      motionBlur: true,
      wheelSensitivity: 0.1,
      ready: function ()
      {
        window.cy = this;
        registerUndoRedoActions();

        // register the extensions

        cy.expandCollapse(getExpandCollapseOptions());
        
        cy.contextMenus({
          menuItemClasses: ['chise-context-menus-menu-item']
        });
        
        cy.appendMenuItems([
          {
            id: 'ctx-menu-delete',
            title: 'Delete',
            selector: 'node, edge', 
            onClickFunction: function (event) { 
              cy.undoRedo().do("removeEles", event.cyTarget);
            }
          },
          {
            id: 'ctx-menu-expand', // ID of menu item
            title: 'Expand', // Title of menu item
            // Filters the elements to have this menu item on cxttap
            // If the selector is not truthy no elements will have this menu item on cxttap
            selector: 'node[expanded-collapsed="collapsed"]', 
            onClickFunction: function (event) { // The function to be executed on click
              cy.undoRedo().do("expand", {
                nodes: event.cyTarget
              });
            }
          },
          {
            id: 'ctx-menu-collapse',
            title: 'Collapse',
            selector: 'node[expanded-collapsed="expanded"]', 
            onClickFunction: function (event) {
              cy.undoRedo().do("collapse", {
                nodes: event.cyTarget
              });
            }
          },
          {
            id: 'ctx-menu-delete-selected', 
            title: 'Delete Selected', 
            onClickFunction: function () { 
              $("#delete-selected-simple").trigger('click');
            },
            coreAsWell: true // Whether core instance have this item on cxttap
          },
          {
            id: 'ctx-menu-perform-layout', 
            title: 'Perform Layout', 
            onClickFunction: function () { 
              if (modeHandler.mode == "selection-mode") {
                $("#perform-layout").trigger('click');
              }
            },
            coreAsWell: true // Whether core instance have this item on cxttap
          },
          {
            id: 'ctx-menu-hide-selected', 
            title: 'Hide Selected', 
            onClickFunction: function () { 
              $("#hide-selected").trigger('click');
            },
            coreAsWell: true // Whether core instance have this item on cxttap
          },
          {
            id: 'ctx-menu-show-all', 
            title: 'Show All', 
            onClickFunction: function () { 
              $("#show-all").trigger('click');
            },
            coreAsWell: true // Whether core instance have this item on cxttap
          }
        ]);

        cy.edgeBendEditing({
          // this function specifies the positions of bend points
          bendPositionsFunction: function(ele) {
            return ele.data('bendPointPositions');
          },
          // whether the bend editing operations are undoable (requires cytoscape-undo-redo.js)
          undoable: true
        });

        cy.clipboard({
          clipboardSize: 5, // Size of clipboard. 0 means unlimited. If size is exceeded, first added item in clipboard will be removed.
          shortcuts: {
            enabled: false, // Whether keyboard shortcuts are enabled
            undoable: true // and if undoRedo extension exists
          }
        });

        cy.viewUtilities({
          node: {
            highlighted: {}, // styles for when nodes are highlighted.
            unhighlighted: { // styles for when nodes are unhighlighted.
              'border-opacity': 0.3,
              'text-opacity': 0.3,
              'background-opacity': 0.3
            },
            hidden: {
              'display': 'none'
            }
          },
          edge: {
            highlighted: {}, // styles for when edges are highlighted.
            unhighlighted: { // styles for when edges are unhighlighted.
              'opacity': 0.3,
              'text-opacity': 0.3,
              'background-opacity': 0.3
            },
            hidden: {
              'display': 'none'
            }
          }
        });

        cy.nodeResize();

        var edges = cy.edges();

        refreshPaddings();
        initilizeUnselectedDataOfElements();

        //For adding edges interactively
        cy.edgehandles({
          complete: function (sourceNode, targetNodes, addedEntities) {
            // fired when edgehandles is done and entities are added
            var param = {};
            var source = sourceNode.id();
            var target = targetNodes[0].id();
            var sourceClass = sourceNode.data('sbgnclass');
            var targetClass = targetNodes[0].data('sbgnclass');
            var sbgnclass = modeHandler.elementsHTMLNameToName[modeHandler.selectedEdgeType];

            if (sbgnclass == 'consumption' || sbgnclass == 'modulation'
                || sbgnclass == 'stimulation' || sbgnclass == 'catalysis'
                || sbgnclass == 'inhibition' || sbgnclass == 'necessary stimulation') {
              if (!isEPNClass(sourceClass) || !isPNClass(targetClass)) {
                if (isPNClass(sourceClass) && isEPNClass(targetClass)) {
                  //If just the direction is not valid reverse the direction
                  var temp = source;
                  source = target;
                  target = temp;
                }
                else {
                  return;
                }
              }
            }
            else if (sbgnclass == 'production') {
              if (!isPNClass(sourceClass) || !isEPNClass(targetClass)) {
                if (isEPNClass(sourceClass) && isPNClass(targetClass)) {
                  //If just the direction is not valid reverse the direction
                  var temp = source;
                  source = target;
                  target = temp;
                }
                else {
                  return;
                }
              }
            }
            else if (sbgnclass == 'logic arc') {
              var invalid = false;
              if (!isEPNClass(sourceClass) || !isLogicalOperator(targetClass)) {
                if (isLogicalOperator(sourceClass) && isEPNClass(targetClass)) {
                  //If just the direction is not valid reverse the direction
                  var temp = source;
                  source = target;
                  target = temp;
                }
                else {
                  invalid = true;
                }
              }
              
              // the case that both sides are logical operators are valid too
              if(isLogicalOperator(sourceClass) && isLogicalOperator(targetClass)) {
                invalid = false;
              }
              
              if( invalid ) {
                return;
              }
            }
            else if (sbgnclass == 'equivalence arc') {
              if (!(isEPNClass(sourceClass) && convenientToEquivalence(targetClass))
                  && !(isEPNClass(targetClass) && convenientToEquivalence(sourceClass))) {
                return;
              }
            }

            param.newEdge = {
              source: source,
              target: target,
              sbgnclass: sbgnclass
            };
            param.firstTime = true;

            cy.undoRedo().do("addEdge", param);
            
            if( !modeHandler.sustainMode ) {
              modeHandler.setSelectionMode();
            }
            
            cy.edges()[cy.edges().length - 1].select();
          }
        });

        cy.edgehandles('drawoff');

        var panProps = ({
          fitPadding: 10,
          fitSelector: ':visible',
          animateOnFit: function(){
            return sbgnStyleRules['animate-on-drawing-changes'];
          },
          animateOnZoom: function(){
            return sbgnStyleRules['animate-on-drawing-changes'];
          }
        });

        container.cytoscapePanzoom(panProps);


        cy.gridGuide({
          drawGrid: sbgnStyleRules['show-grid'],
          snapToGrid: sbgnStyleRules['snap-to-grid'],
          discreteDrag: sbgnStyleRules['discrete-drag'],
          gridSpacing: sbgnStyleRules['grid-size'],
          resize: sbgnStyleRules['auto-resize-nodes'],
          guidelines: sbgnStyleRules['show-alignment-guidelines'],
          guidelinesTolerance: sbgnStyleRules['guideline-tolerance'],
          guidelinesStyle: {
            strokeStyle: sbgnStyleRules['guideline-color']
          }
        });

        // listen events

        cy.on("beforeCollapse", "node", function (event) {
          var node = this;
          //The children info of complex nodes should be shown when they are collapsed
          if (node._private.data.sbgnclass == "complex") {
            //The node is being collapsed store infolabel to use it later
            var infoLabel = getInfoLabel(node);
            node._private.data.infoLabel = infoLabel;
          }

          var edges = cy.edges();

          // remove bend points before collapse
          for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            if(edge.hasClass('edgebendediting-hasbendpoints')) {
              edge.removeClass('edgebendediting-hasbendpoints');
              delete edge._private.classes['edgebendediting-hasbendpoints'];
            }
          }

          edges.scratch('cyedgebendeditingWeights', []);
          edges.scratch('cyedgebendeditingDistances', []);

        });

        cy.on("afterCollapse", "node", function (event) {
          var node = this;
          refreshPaddings();

          if (node._private.data.sbgnclass == "complex") {
            node.addClass('changeContent');
          }
        });

        cy.on("beforeExpand", "node", function (event) {
          var node = this;
          node.removeData("infoLabel");
        });

        cy.on("afterExpand", "node", function (event) {
          var node = this;
          cy.nodes().updateCompoundBounds();

          //Don't show children info when the complex node is expanded
          if (node._private.data.sbgnclass == "complex") {
            node.removeStyle('content');
          }

          refreshPaddings();
        });

        cy.on("afterDo", function(actionName, args){
          refreshUndoRedoButtonsStatus();
        });

        cy.on("afterUndo", function(actionName, args){
          refreshUndoRedoButtonsStatus();
        });

        cy.on("afterRedo", function(actionName, args){
          refreshUndoRedoButtonsStatus();
        });

        cy.on("mousedown", "node", function () {
          var self = this;
          if (modeHandler.mode == 'selection-mode' && window.ctrlKeyDown) {
            enableDragAndDropMode();
            window.nodeToDragAndDrop = self;
          }
        });

        cy.on("mouseup", function (event) {
          var self = event.cyTarget;
          if (window.dragAndDropModeEnabled) {
            var nodesData = getNodesData();
            nodesData.firstTime = true;
            var newParent;
            if (self != cy) {
              newParent = self;
            }
            var node = window.nodeToDragAndDrop;

            if (newParent && self.data("sbgnclass") != "complex" && self.data("sbgnclass") != "compartment") {
              return;
            }

            if (newParent && self.data("sbgnclass") == "complex" && !isEPNClass(node.data("sbgnclass"))) {
              return;
            }

            disableDragAndDropMode();

            if (node.parent()[0] == newParent || node._private.data.parent == node.id()) {
              return;
            }

            var param = {
              newParent: newParent,
              node: node,
              nodesData: nodesData,
              posX: event.cyPosition.x,
              posY: event.cyPosition.y
            };

            cy.undoRedo().do("changeParent", param);
          }
        });


        function removeQtip(e) {
          if (this.qtipTimeOutFcn != null) {
            clearTimeout(this.qtipTimeOutFcn);
            this.qtipTimeOutFcn = null;
          }
          this.mouseover = false;           //make preset layout to redraw the nodes
          this.removeData("showingTooltip");
          cy.off('mouseout', 'node', removeQtip);
          cy.off("drag", "node", removeQtip);
          $(".qtip").remove();
          cy.forceRender();
        }

        cy.on("mouseover", "node", function (e) {
          e.cy.$("[showingTooltip]").trigger("hideTooltip");
          e.cyTarget.trigger("showTooltip");
        });


        cy.on("hideTooltip", "node", removeQtip);

        cy.on('showTooltip', 'node', function (e) {
          var node = this;
          
          if (node.renderedStyle("label") == node.data("sbgnlabel") && node.data("sbgnstatesandinfos").length == 0 &&  node.data("sbgnclass") != "complex")
              return;

           node.data("showingTooltip", true);
          $(".qtip").remove();

          if (e.originalEvent.shiftKey)
            return;

          node.qtipTimeOutFcn = setTimeout(function () {
            nodeQtipFunction(node);
          }, 1000);
          cy.on('mouseout', 'node', removeQtip);
          cy.on("drag", "node", removeQtip)
        });


        
        

        cy.on('cxttap', 'node', function (event) {
          var node = this;
          $(".qtip").remove();

          if (node.qtipTimeOutFcn != null) {
            clearTimeout(node.qtipTimeOutFcn);
            node.qtipTimeOutFcn = null;
          }

          var geneClass = node._private.data.sbgnclass;
          if (geneClass != 'macromolecule' && geneClass != 'nucleic acid feature' &&
              geneClass != 'unspecified entity')
            return;

          var queryScriptURL = "sampleapp-components/php/BioGeneQuery.php";
          var geneName = node._private.data.sbgnlabel;

          // set the query parameters
          var queryParams =
          {
            query: geneName,
            org: "human",
            format: "json",
          };

          cy.getElementById(node.id()).qtip({
            content: {
              text: function (event, api) {
                $.ajax({
                  type: "POST",
                  url: queryScriptURL,
                  async: true,
                  data: queryParams,
                })
                    .then(function (content) {
                      queryResult = JSON.parse(content);
                      if (queryResult.count > 0 && queryParams.query != "" && typeof queryParams.query != 'undefined')
                      {
                        var info = (new BioGeneView(
                            {
                              el: '#biogene-container',
                              model: queryResult.geneInfo[0]
                            })).render();
                        var html = $('#biogene-container').html();
                        api.set('content.text', html);
                      }
                      else {
                        api.set('content.text', "No additional information available &#013; for the selected node!");
                      }
                    }, function (xhr, status, error) {
                      api.set('content.text', "Error retrieving data: " + error);
                    });
                api.set('content.title', node._private.data.sbgnlabel);
                return _.template($("#loading-small-template").html());
              }
            },
            show: {
              ready: true
            },
            position: {
              my: 'top center',
              at: 'bottom center',
              adjust: {
                cyViewport: true
              },
              effect: false
            },
            style: {
              classes: 'qtip-bootstrap',
              tip: {
                width: 16,
                height: 8
              }
            }
          });
        });

//        var cancelSelection;
//        var selectAgain;
        window.firstSelectedNode = null;
        cy.on('select', 'node', function (event) {
//          if (cancelSelection) {
//            this.unselect();
//            cancelSelection = null;
//            selectAgain.select();
//            selectAgain = null;
//          }
          if (cy.nodes(':selected').filter(':visible').length == 1) {
            window.firstSelectedNode = this;
          }
        });

        cy.on('unselect', 'node', function (event) {
          if (window.firstSelectedNode == this) {
            window.firstSelectedNode = null;
          }
        });

        cy.on('select', function (event) {
          inspectorUtilities.handleSBGNInspector();
        });

        cy.on('unselect', function (event) {
          inspectorUtilities.handleSBGNInspector();
        });

        cy.on('tap', function (event) {
          $('input').blur();
//          $("#node-label-textbox").blur();
          cy.nodes(":selected").length;

          if (modeHandler.mode == "add-node-mode") {
            var cyPosX = event.cyPosition.x;
            var cyPosY = event.cyPosition.y;
            var param = {};
            var sbgnclass = modeHandler.elementsHTMLNameToName[modeHandler.selectedNodeType];

            param.newNode = {
              x: cyPosX,
              y: cyPosY,
              sbgnclass: sbgnclass
            };
            param.firstTime = true;

            cy.undoRedo().do("addNode", param);
            
            if( !modeHandler.sustainMode ) {
              modeHandler.setSelectionMode();
            }
            
            cy.nodes()[cy.nodes().length - 1].select();
          }
        });

        var tappedBefore = null;

        cy.on('doubleTap', 'node', function (event) {
          if (modeHandler.mode == 'selection-mode') {
            var node = this;
            var containerPos = $(cy.container()).position();
            var left = containerPos.left + this.renderedPosition().x;
            left -= $("#node-label-textbox").width() / 2;
            left = left.toString() + 'px';
            var top = containerPos.top + this.renderedPosition().y;
            top -= $("#node-label-textbox").height() / 2;
            top = top.toString() + 'px';

            $("#node-label-textbox").css('left', left);
            $("#node-label-textbox").css('top', top);
            $("#node-label-textbox").show();
            var sbgnlabel = this._private.data.sbgnlabel;
            if (sbgnlabel == null) {
              sbgnlabel = "";
            }
            $("#node-label-textbox").attr('value', sbgnlabel);
            $("#node-label-textbox").data('node', this);
            $("#node-label-textbox").focus();
          }
        });

        cy.on('tap', 'node', function (event) {
          var node = this;

          var tappedNow = event.cyTarget;
          setTimeout(function () {
            tappedBefore = null;
          }, 300);
          if (tappedBefore === tappedNow) {
            tappedNow.trigger('doubleTap');
            tappedBefore = null;
          } else {
            tappedBefore = tappedNow;
          }
        });
      }
    };

    container.html("");
    endSpinner("load-file-spinner");
    container.cy(cyOptions);
    return this;
  }
});

var SBGNLayout = Backbone.View.extend({
  defaultLayoutProperties: {
    name: 'cose-bilkent',
    nodeRepulsion: 4500,
    nodeOverlap: 10,
    idealEdgeLength: 50,
    edgeElasticity: 0.45,
    nestingFactor: 0.1,
    gravity: 0.25,
    numIter: 2500,
    tile: true,
    animationEasing: 'cubic-bezier(0.19, 1, 0.22, 1)',
    animate: 'end',
    animationDuration: 1000,
    randomize: true,
    tilingPaddingVertical: function () {
      return calculateTilingPaddings(parseInt(sbgnStyleRules['tiling-padding-vertical'], 10));
    },
    tilingPaddingHorizontal: function () {
      return calculateTilingPaddings(parseInt(sbgnStyleRules['tiling-padding-horizontal'], 10));
    },
    gravityRangeCompound: 1.5,
    gravityCompound: 1.0,
    gravityRange: 3.8,
    stop: function(){
      if($('.layout-spinner').length > 0){
        $('.layout-spinner').remove();
      }
    }
  },
  currentLayoutProperties: null,
  initialize: function () {
    var self = this;
    self.copyProperties();

    var templateProperties = _.clone(self.currentLayoutProperties);
    templateProperties.tilingPaddingVertical = sbgnStyleRules['tiling-padding-vertical'];
    templateProperties.tilingPaddingHorizontal = sbgnStyleRules['tiling-padding-horizontal'];

    self.template = _.template($("#layout-settings-template").html(), templateProperties);
  },
  copyProperties: function () {
    this.currentLayoutProperties = _.clone(this.defaultLayoutProperties);
  },
  applyLayout: function (preferences, undoable) {
    if(preferences === undefined){
      preferences = {};
    }
    var options = $.extend({}, this.currentLayoutProperties, preferences);
    if(undoable === false) {
      cy.elements().filter(':visible').layout(options);
    }
    else {
      cy.undoRedo().do("layout", {
        options: options,
        eles: cy.elements().filter(':visible')
      });
    }
  },
  render: function () {
    var self = this;

    var templateProperties = _.clone(self.currentLayoutProperties);
    templateProperties.tilingPaddingVertical = sbgnStyleRules['tiling-padding-vertical'];
    templateProperties.tilingPaddingHorizontal = sbgnStyleRules['tiling-padding-horizontal'];

    self.template = _.template($("#layout-settings-template").html(), templateProperties);
    $(self.el).html(self.template);

    $(self.el).dialog();

    $("#save-layout").die("click").live("click", function (evt) {
      self.currentLayoutProperties.nodeRepulsion = Number(document.getElementById("node-repulsion").value);
      self.currentLayoutProperties.nodeOverlap = Number(document.getElementById("node-overlap").value);
      self.currentLayoutProperties.idealEdgeLength = Number(document.getElementById("ideal-edge-length").value);
      self.currentLayoutProperties.edgeElasticity = Number(document.getElementById("edge-elasticity").value);
      self.currentLayoutProperties.nestingFactor = Number(document.getElementById("nesting-factor").value);
      self.currentLayoutProperties.gravity = Number(document.getElementById("gravity").value);
      self.currentLayoutProperties.numIter = Number(document.getElementById("num-iter").value);
      self.currentLayoutProperties.tile = document.getElementById("tile").checked;
      self.currentLayoutProperties.animate = document.getElementById("animate").checked?'during':'end';
      self.currentLayoutProperties.randomize = !document.getElementById("incremental").checked;
      self.currentLayoutProperties.gravityRangeCompound = Number(document.getElementById("gravity-range-compound").value);
      self.currentLayoutProperties.gravityCompound = Number(document.getElementById("gravity-compound").value);
      self.currentLayoutProperties.gravityRange = Number(document.getElementById("gravity-range").value);

      sbgnStyleRules['tiling-padding-vertical'] = Number(document.getElementById("tiling-padding-vertical").value);
      sbgnStyleRules['tiling-padding-horizontal'] = Number(document.getElementById("tiling-padding-horizontal").value);

      $(self.el).dialog('close');
    });

    $("#default-layout").die("click").live("click", function (evt) {
      self.copyProperties();

      sbgnStyleRules['tiling-padding-vertical'] = defaultSbgnStyleRules['tiling-padding-vertical'];
      sbgnStyleRules['tiling-padding-horizontal'] = defaultSbgnStyleRules['tiling-padding-horizontal'];

      var templateProperties = _.clone(self.currentLayoutProperties);
      templateProperties.tilingPaddingVertical = sbgnStyleRules['tiling-padding-vertical'];
      templateProperties.tilingPaddingHorizontal = sbgnStyleRules['tiling-padding-horizontal'];

      self.template = _.template($("#layout-settings-template").html(), templateProperties);
      $(self.el).html(self.template);
    });

    return this;
  }
});

var SBGNProperties = Backbone.View.extend({
  defaultSBGNProperties: {
    compoundPadding: parseInt(sbgnStyleRules['compound-padding'], 10),
    dynamicLabelSize: sbgnStyleRules['dynamic-label-size'],
    fitLabelsToNodes: sbgnStyleRules['fit-labels-to-nodes'],
    rearrangeAfterExpandCollapse: sbgnStyleRules['rearrange-after-expand-collapse'],
    animateOnDrawingChanges: sbgnStyleRules['animate-on-drawing-changes']
  },
  currentSBGNProperties: null,
  initialize: function () {
    var self = this;
    self.copyProperties();
    self.template = _.template($("#sbgn-properties-template").html(), self.currentSBGNProperties);
  },
  copyProperties: function () {
    this.currentSBGNProperties = _.clone(this.defaultSBGNProperties);
  },
  render: function () {
    var self = this;
    self.template = _.template($("#sbgn-properties-template").html(), self.currentSBGNProperties);
    $(self.el).html(self.template);

    $(self.el).dialog();

    $("#save-sbgn").die("click").live("click", function (evt) {

      var param = {};
      param.firstTime = true;
      param.previousSBGNProperties = _.clone(self.currentSBGNProperties);

      self.currentSBGNProperties.compoundPadding = Number(document.getElementById("compound-padding").value);
      self.currentSBGNProperties.dynamicLabelSize = $('select[name="dynamic-label-size"] option:selected').val();
      self.currentSBGNProperties.fitLabelsToNodes = document.getElementById("fit-labels-to-nodes").checked;
      self.currentSBGNProperties.rearrangeAfterExpandCollapse =
          document.getElementById("rearrange-after-expand-collapse").checked;
      self.currentSBGNProperties.animateOnDrawingChanges =
          document.getElementById("animate-on-drawing-changes").checked;

      //Refresh paddings if needed
      if (sbgnStyleRules['compound-padding'] != self.currentSBGNProperties.compoundPadding) {
        sbgnStyleRules['compound-padding'] = self.currentSBGNProperties.compoundPadding;
        refreshPaddings();
      }
      //Refresh label size if needed
      if (sbgnStyleRules['dynamic-label-size'] != self.currentSBGNProperties.dynamicLabelSize) {
        sbgnStyleRules['dynamic-label-size'] = '' + self.currentSBGNProperties.dynamicLabelSize;
        cy.nodes().removeClass('changeLabelTextSize');
        cy.nodes().addClass('changeLabelTextSize');
      }
      //Refresh truncations if needed
      if (sbgnStyleRules['fit-labels-to-nodes'] != self.currentSBGNProperties.fitLabelsToNodes) {
        sbgnStyleRules['fit-labels-to-nodes'] = self.currentSBGNProperties.fitLabelsToNodes;
        cy.nodes().removeClass('changeContent');
        cy.nodes().addClass('changeContent');
      }

      sbgnStyleRules['rearrange-after-expand-collapse'] =
          self.currentSBGNProperties.rearrangeAfterExpandCollapse;

      sbgnStyleRules['animate-on-drawing-changes'] =
          self.currentSBGNProperties.animateOnDrawingChanges;

      $(self.el).dialog('close');
    });

    $("#default-sbgn").die("click").live("click", function (evt) {
      self.copyProperties();
      self.template = _.template($("#sbgn-properties-template").html(), self.currentSBGNProperties);
      $(self.el).html(self.template);
    });

    return this;
  }
});

var GridProperties = Backbone.View.extend({
  defaultGridProperties: {
    showGrid: sbgnStyleRules['show-grid'],
    snapToGrid: sbgnStyleRules['snap-to-grid'],
    discreteDrag: sbgnStyleRules['discrete-drag'],
    gridSize: sbgnStyleRules['grid-size'],
    autoResizeNodes: sbgnStyleRules['auto-resize-nodes'],
    showAlignmentGuidelines: sbgnStyleRules['show-alignment-guidelines'],
    guidelineTolerance: sbgnStyleRules['guideline-tolerance'],
    guidelineColor: sbgnStyleRules['guideline-color']
  },
  currentGridProperties: null,
  initialize: function () {
    var self = this;
    self.copyProperties();
    self.template = _.template($("#grid-properties-template").html(), self.currentGridProperties);
  },
  copyProperties: function () {
    this.currentGridProperties = _.clone(this.defaultGridProperties);
  },
  render: function () {
    var self = this;
    self.template = _.template($("#grid-properties-template").html(), self.currentGridProperties);
    $(self.el).html(self.template);

    $(self.el).dialog();

    $("#save-grid").die("click").live("click", function (evt) {

      var param = {};
      param.firstTime = true;
      param.previousGrid = _.clone(self.currentGridProperties);

      self.currentGridProperties.showGrid = document.getElementById("show-grid").checked;
      self.currentGridProperties.snapToGrid = document.getElementById("snap-to-grid").checked;
      self.currentGridProperties.gridSize = Number(document.getElementById("grid-size").value);
      self.currentGridProperties.discreteDrag = document.getElementById("discrete-drag").checked;
      self.currentGridProperties.autoResizeNodes = document.getElementById("auto-resize-nodes").checked;
      self.currentGridProperties.showAlignmentGuidelines = document.getElementById("show-alignment-guidelines").checked;
      self.currentGridProperties.guidelineTolerance = Number(document.getElementById("guideline-tolerance").value);
      self.currentGridProperties.guidelineColor = document.getElementById("guideline-color").value;

      sbgnStyleRules["show-grid"] = document.getElementById("show-grid").checked;
      sbgnStyleRules["snap-to-grid"] = document.getElementById("snap-to-grid").checked;
      sbgnStyleRules["grid-size"] = Number(document.getElementById("grid-size").value);
      sbgnStyleRules["discrete-drag"] = document.getElementById("discrete-drag").checked;
      sbgnStyleRules["auto-resize-nodes"] = document.getElementById("auto-resize-nodes").checked;
      sbgnStyleRules["show-alignment-guidelines"] = document.getElementById("show-alignment-guidelines").checked;
      sbgnStyleRules["guideline-tolerance"] = Number(document.getElementById("guideline-tolerance").value);
      sbgnStyleRules["guideline-color"] = document.getElementById("guideline-color").value;


      cy.gridGuide({
        drawGrid: self.currentGridProperties.showGrid,
        snapToGrid: self.currentGridProperties.snapToGrid,
        gridSpacing: self.currentGridProperties.gridSize,
        discreteDrag: self.currentGridProperties.discreteDrag,
        resize: self.currentGridProperties.autoResizeNodes,
        guidelines: self.currentGridProperties.showAlignmentGuidelines,
        guidelinesTolerance: self.currentGridProperties.guidelineTolerance,
        guidelinesStyle: {
          strokeStyle: self.currentGridProperties.guidelineColor
        }
      });

      $(self.el).dialog('close');
    });

    $("#default-grid").die("click").live("click", function (evt) {
      self.copyProperties();
      self.template = _.template($("#grid-properties-template").html(), self.currentGridProperties);
      $(self.el).html(self.template);
    });

    return this;
  }
});

var PathsBetweenQuery = Backbone.View.extend({
  defaultQueryParameters: {
    geneSymbols: "",
    lengthLimit: 1
//    shortestK: 0,
//    enableShortestKAlteration: false,
//    ignoreS2SandT2TTargets: false
  },
  currentQueryParameters: null,
  initialize: function () {
    var self = this;
    self.copyProperties();
    self.template = _.template($("#query-pathsbetween-template").html(), self.currentQueryParameters);
  },
  copyProperties: function () {
    this.currentQueryParameters = _.clone(this.defaultQueryParameters);
  },
  render: function () {
    var self = this;
    self.template = _.template($("#query-pathsbetween-template").html(), self.currentQueryParameters);
    $(self.el).html(self.template);

    $("#query-pathsbetween-enable-shortest-k-alteration").change(function(e){
      if(document.getElementById("query-pathsbetween-enable-shortest-k-alteration").checked){
        $( "#query-pathsbetween-shortest-k" ).prop( "disabled", false );
      }
      else {
        $( "#query-pathsbetween-shortest-k" ).prop( "disabled", true );
      }
    });

    $(self.el).dialog({width:'auto'});

    $("#save-query-pathsbetween").die("click").live("click", function (evt) {

      self.currentQueryParameters.geneSymbols = document.getElementById("query-pathsbetween-gene-symbols").value;
      self.currentQueryParameters.lengthLimit = Number(document.getElementById("query-pathsbetween-length-limit").value);
//      self.currentQueryParameters.shortestK = Number(document.getElementById("query-pathsbetween-shortest-k").value);
//      self.currentQueryParameters.enableShortestKAlteration =
//              document.getElementById("query-pathsbetween-enable-shortest-k-alteration").checked;
//      self.currentQueryParameters.ignoreS2SandT2TTargets =
//              document.getElementById("query-pathsbetween-ignore-s2s-t2t-targets").checked;

      var pc2URL = "http://www.pathwaycommons.org/pc2/";
      var format = "graph?format=SBGN";
      var kind = "&kind=PATHSBETWEEN";
      var limit = "&limit=" + self.currentQueryParameters.lengthLimit;
      var sources = "";
      var newfilename = "";

      var geneSymbolsArray = self.currentQueryParameters.geneSymbols.replace("\n"," ").replace("\t"," ").split(" ");
      for(var i = 0; i < geneSymbolsArray.length; i++){
        var currentGeneSymbol = geneSymbolsArray[i];
        if(currentGeneSymbol.length == 0 || currentGeneSymbol == ' ' || currentGeneSymbol == '\n' || currentGeneSymbol == '\t'){
          continue;
        }

        sources = sources + "&source=" + currentGeneSymbol;

        if(newfilename == ''){
          newfilename = currentGeneSymbol;
        }
        else{
          newfilename = newfilename + '_' + currentGeneSymbol;
        }
      }

      newfilename = newfilename + '_PBTWN.sbgnml';

      setFileContent(newfilename);
      pc2URL = pc2URL + format + kind + limit + sources;

      var containerWidth = cy.width();
      var containerHeight = cy.height();
      $('#sbgn-network-container').html('<i style="position: absolute; z-index: 9999999; left: ' + containerWidth / 2 + 'px; top: ' + containerHeight / 2 + 'px;" class="fa fa-spinner fa-spin fa-3x fa-fw"></i>');

      $.ajax(
          {
            url: pc2URL,
            type: 'GET',
            success: function(data)
            {
              (new SBGNContainer({
                el: '#sbgn-network-container',
                model: {cytoscapeJsGraph: sbgnmlToJson.convert(data)}
              })).render();
              inspectorUtilities.handleSBGNInspector();
            }
          });

      $(self.el).dialog('close');
    });

    $("#cancel-query-pathsbetween").die("click").live("click", function (evt) {
      $(self.el).dialog('close');
    });

    return this;
  }
});

var ReactionTemplate = Backbone.View.extend({
  defaultTemplateParameters: {
    templateType: "association",
    macromoleculeList: ["", ""],
    templateReactionEnableComplexName: true,
    templateReactionComplexName: "",
    getMacromoleculesHtml: function(){
      var html = "<table>";
      for( var i = 0; i < this.macromoleculeList.length; i++){
        html += "<tr><td>"
            + "<input type='text' class='template-reaction-textbox input-small layout-text' name='"
            + i + "'" + " value='" + this.macromoleculeList[i] + "'></input>"
            + "</td><td><img style='padding-bottom: 8px;' class='template-reaction-delete-button' width='12px' height='12px' name='" + i + "' src='sampleapp-images/delete.png'/></td></tr>";
      }

      html += "<tr><td><img id='template-reaction-add-button' src='sampleapp-images/add.png'/></td></tr></table>";
      return html;
    },
    getComplexHtml: function(){
      var html = "<table>"
          + "<tr><td><input type='checkbox' class='input-small layout-text' id='template-reaction-enable-complex-name'";

      if(this.templateReactionEnableComplexName){
        html += " checked ";
      }

      html += "/>"
          + "</td><td><input type='text' class='input-small layout-text' id='template-reaction-complex-name' value='"
          + this.templateReactionComplexName + "'";

      if(!this.templateReactionEnableComplexName){
        html += " disabled ";
      }

      html += "></input>"
          + "</td></tr></table>";

      return html;
    },
    getInputHtml: function(){
      if(this.templateType === 'association') {
        return this.getMacromoleculesHtml();
      }
      else if(this.templateType === 'dissociation'){
        return this.getComplexHtml();
      }
    },
    getOutputHtml: function(){
      if(this.templateType === 'association') {
        return this.getComplexHtml();
      }
      else if(this.templateType === 'dissociation'){
        return this.getMacromoleculesHtml();
      }
    }
  },
  currentTemplateParameters: undefined,
  initialize: function () {
    var self = this;
    self.copyProperties();
    self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
  },
  copyProperties: function () {
    this.currentTemplateParameters = jQuery.extend(true, [], this.defaultTemplateParameters);
  },
  render: function () {
    var self = this;
    self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
    $(self.el).html(self.template);

    $(self.el).dialog({width:'auto'});

    $('#reaction-template-type-select').die('change').live('change', function (e) {
      var optionSelected = $("option:selected", this);
      var valueSelected = this.value;
      self.currentTemplateParameters.templateType = valueSelected;

      self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
      $(self.el).html(self.template);

      $(self.el).dialog({width:'auto'});
    });

    $("#template-reaction-enable-complex-name").die("change").live("change", function(e){
      self.currentTemplateParameters.templateReactionEnableComplexName =
          !self.currentTemplateParameters.templateReactionEnableComplexName;
      self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
      $(self.el).html(self.template);

      $(self.el).dialog({width:'auto'});
    });

    $("#template-reaction-complex-name").die("change").live("change", function(e){
      self.currentTemplateParameters.templateReactionComplexName = $(this).attr('value');
      self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
      $(self.el).html(self.template);

      $(self.el).dialog({width:'auto'});
    });

    $("#template-reaction-add-button").die("click").live("click",function (event) {
      self.currentTemplateParameters.macromoleculeList.push("");

      self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
      $(self.el).html(self.template);

      $(self.el).dialog({width:'auto'});
    });

    $(".template-reaction-textbox").die('change').live('change', function () {
      var index = parseInt($(this).attr('name'));
      var value = $(this).attr('value');
      self.currentTemplateParameters.macromoleculeList[index] = value;

      self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
      $(self.el).html(self.template);

      $(self.el).dialog({width:'auto'});
    });

    $(".template-reaction-delete-button").die("click").live("click",function (event) {
      if(self.currentTemplateParameters.macromoleculeList.length <= 2){
        return;
      }

      var index = parseInt($(this).attr('name'));
      self.currentTemplateParameters.macromoleculeList.splice(index, 1);

      self.template = _.template($("#reaction-template").html(), self.currentTemplateParameters);
      $(self.el).html(self.template);

      $(self.el).dialog({width:'auto'});
    });

    $("#create-template").die("click").die("click").live("click", function (evt) {
      var param = {
        firstTime: true,
        templateType: self.currentTemplateParameters.templateType,
        processPosition: sbgnElementUtilities.convertToModelPosition({x: cy.width() / 2, y: cy.height() / 2}),
        macromoleculeList: jQuery.extend(true, [], self.currentTemplateParameters.macromoleculeList),
        complexName: self.currentTemplateParameters.templateReactionEnableComplexName?self.currentTemplateParameters.templateReactionComplexName:undefined,
        tilingPaddingVertical: calculateTilingPaddings(parseInt(sbgnStyleRules['tiling-padding-vertical'], 10)),
        tilingPaddingHorizontal: calculateTilingPaddings(parseInt(sbgnStyleRules['tiling-padding-horizontal'], 10))
      };

      cy.undoRedo().do("createTemplateReaction", param);

      self.copyProperties();
      $(self.el).dialog('close');
    });

    $("#cancel-template").die("click").die("click").live("click", function (evt) {
      self.copyProperties();
      $(self.el).dialog('close');
    });

    return this;
  }
});