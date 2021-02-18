import React, {Component} from 'react';
import {DataSearch,ReactiveBase,ReactiveList,ResultList,ResultCard, SelectedFilters, MultiList} from '@appbaseio/reactivesearch';

const {ResultListWrapper} = ReactiveList;

class App extends Component {
    render() {
        return ( 
            <div>
                <ReactiveBase
                    app="books"
            		    url = "https://elastic:oGjNH80iFWY3CF8JBUMiwm1x@7007bf8d8b9e4015b4d35473934df903.japaneast.azure.elastic-cloud.com:9243"  
                >
                    <DataSearch
                        componentId = "search-component"
                        dataField = {["title"]}
                        queryFormat = "and"
                    />
                    <MultiList componentId="CategorySensor" 
                    dataField="categories.keyword" 
                    title="カテゴリー" />
                    <SelectedFilters/>
                    <ReactiveList
                        componentId = "list-component"
                        pagination = {true}
                        size = {10}
                        react = {{
                            "and": ["search-component"]
                        }}
                        sortOptions={[
                          {label: "ベストマッチ", dataField: "_score", sortBy: "desc"},
                          {label: "ページ数少なめ", dataField: "pageCount", sortBy: "asc"},
                          {label: "ページ数多め", dataField: "pageCount", sortBy: "desc"},
                         ]}
                    >

                        {({data, error, loading}) => (
                            <ResultListWrapper>
                                {
                                    data.map(item => (
                                        <ResultList key = {item._id}>
                                            <ResultList.Content>
                                                <ResultList.Title
                                                    dangerouslySetInnerHTML = {{
                                                        __html: item.title
                                                    }}
                                                />
                                                <ResultList.Description>
                                                    <div> {item.title} </div>
                                                    <div> {item.isbn} </div>
                                                    <div> {item.pageCount}ページ </div>
                                                </ResultList.Description>
                                                <ResultCard key={item._id}>
                                                  <ResultCard.Image src={item.thumbnailUrl} />
                                                  <ResultCard.Title
                                                    dangerouslySetInnerHTML={{
                                                      __html: item.title
                                                    }}
                                                  />
                    </ResultCard>
                                            </ResultList.Content>
                                        </ResultList>

                                    ))
                                }
                            </ResultListWrapper>
                        )}
                    </ReactiveList>
                </ReactiveBase>
            </div>
        );
    }
}

export default App;
