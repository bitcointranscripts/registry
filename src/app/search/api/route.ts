import { NextRequest, NextResponse } from "next/server";
import { client } from "@/config/elasticSearch";
import { SearchQuery } from "../types";
import { aggregatorSize, FIELDS_TO_EXCLUDE, FIELDS_TO_SEARCH } from "@/config";

export async function POST(request: NextRequest) {
  try {
    const body: SearchQuery = await request.json();
  
    const query = buildQuery(body);
  
    const response = await client.search({
      index: process.env.INDEX,
      ...query,
    });
  
    return NextResponse.json({data: response, success: true});
  }
  catch (error: any) {
    console.error({error});
    return NextResponse.json({success: false, message: error.message ? error.message : "Error while fetching"});
  }
}

function buildQuery({
  queryString,
  filterFields,
  page,
  size,
  sortFields,
}: SearchQuery) {

  const baseQuery = {
    query: {
      bool: {
        must: [] as any[],
        should: [],
        filter: [
          {
            "exists": {
              "field": "transcript_source.keyword",
            },
          }, // Ensure we are working with transcripts that have a source
        ] as any[],
      },
    },
    sort: [] as any[],
    aggs: {
      authors: {
        terms: {
          field: "authors.keyword",
          size: aggregatorSize,
        },
      },
      transcript_source: {
        terms: {
          field: "transcript_source.keyword",
          size: aggregatorSize,
        },
      },
      tags: {
        terms: {
          field: "tags.keyword",
          size: aggregatorSize,
        },
      },
    },
    size, // Number of search results to return
    from: page * size, // Offset for pagination (calculated from page number)
    _source: {
      excludes: FIELDS_TO_EXCLUDE,
    },
  };
  if (queryString.trim()) {
    baseQuery.query.bool.must.push({ "multi_match": { query: queryString, fields: FIELDS_TO_SEARCH } });
  }

  filterFields.forEach((filter) => {
    baseQuery.query.bool.filter.push({ "term": { [`${[filter.field]}.keyword`]: filter.value } });
  });

  sortFields.forEach((sort) => {
    baseQuery.sort.push({ [sort.field]: sort.value });
  });

  return baseQuery;
}
