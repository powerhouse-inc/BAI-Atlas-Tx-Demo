import { IBaseDocumentDriveServer } from "document-drive/server";
import { actions as atlasScopeActions } from "../../document-models/atlas-scope";
import { actions as atlasFoundationActions } from "../../document-models/atlas-foundation";
import { addFolder, addDocument } from "./drive-actions";
import notionSections from "../atlas-scope/data/notion-pages/section.json";

export const populateScope = (
  driveServer: IBaseDocumentDriveServer,
  driveId: string,
  documentId: string,
  scope: any,
  provenanceUrl: string | undefined,
  jsonMasterStatus: any
) => {
  return driveServer.addAction(
    driveId,
    documentId,
    atlasScopeActions.populateScope({
      name: scope.nameString,
      docNo: scope.docNoString,
      content: scope.content[0].text[0].plain_text,
      masterStatus: scope.masterStatus
        .map((s: any) => {
          const masterStatus = jsonMasterStatus as Record<string, any>;
          const statusObject = masterStatus[s.id];
          if (!statusObject) {
            throw new Error(`Master status not found for key: ${s.id}`);
          }
          return statusObject.nameString.toUpperCase();
        })
        .flat()[0],
      globalTags: ["CAIS"],
      originalContextData: ["somePHID"],
      provenance: provenanceUrl,
      notionId: scope.id,
    })
  );
};

export const populateArticle = (
  driveServer: IBaseDocumentDriveServer,
  driveId: string,
  documentId: string,
  article: any,
  scope: any
) => {
  return driveServer.addAction(
    driveId,
    documentId,
    atlasFoundationActions.populateFoundation({
      name: article.properties["Name"].rich_text[0].plain_text,
      docNo: article.properties["Doc No"].title[0].plain_text,
      parent: scope.id,
      atlasType: "ARTICLE",
      content: article.properties["Content"].rich_text[0].plain_text,
      masterStatus: "PLACEHOLDER",
      globalTags: ["CAIS"],
      references: [],
      originalContextData: article.properties[
        "Original Context Data"
      ].relation.map((r: any) => r.id),
      provenance: article.url,
      notionId: article.id,
    })
  );
};

export const populateSection = (
  driveServer: IBaseDocumentDriveServer,
  driveId: string,
  documentId: string,
  section: any,
  article: any
) => {
  return driveServer.addAction(
    driveId,
    documentId,
    atlasFoundationActions.populateFoundation({
      name: section.properties["Name"].formula.string,
      docNo: section.properties["Doc No (or Temp Name)"].title[0].plain_text,
      parent: article.id,
      atlasType: "SECTION",
      content: section.properties["Content"].rich_text[0].plain_text,
      masterStatus: "PLACEHOLDER",
      globalTags: ["CAIS"],
      references: [],
      originalContextData: [],
      provenance: section.url,
      notionId: section.id,
    })
  );
};


export const addArticles = async (
  driveServer: IBaseDocumentDriveServer,
  driveId: string,
  documentId: string,
  articlesIds: any[],
  notionArticles: any[],
  scope: any
) => {
  for (const articleObj of articlesIds) {
    const article = notionArticles.find((a: any) => a.id === articleObj.id);
    if (!article) {
      continue;
    }

    await addFolder(
      driveServer,
      driveId,
      article.id + "-folder",
      `${article.properties["Doc No"].title[0].plain_text} ${article.properties["Name"].rich_text[0].plain_text}`,
      scope.id + "-folder"
    );
    await addDocument(
      driveServer,
      driveId,
      article.id + "-document",
      `${article.properties["Doc No"].title[0].plain_text} ${article.properties["Name"].rich_text[0].plain_text}`,
      "sky/atlas-foundation",
      article.id + "-folder"
    );

    const result = await populateArticle(
      driveServer,
      driveId,
      article.id + "-document",
      article,
      scope
    );

    // add sections to article
    await addSections(
      driveServer,
      driveId,
      article.id + "-folder",
      article.properties["Sections & Primary Docs"].relation,
      notionSections,
      article
    );
  }
};

export const addSections = async (
  driveServer: IBaseDocumentDriveServer,
  driveId: string,
  parentFolderId: string,
  sectionsIds: any[],
  notionSections: any,
  article: any
) => {
  for (const sectionObj of sectionsIds) {
    const section = notionSections.find((s: any) => s.id === sectionObj.id);
    if (!section) {
      continue;
    }

    const sectionName = section.properties["Doc No (or Temp Name)"].title[0].plain_text;
    if (sectionName === 'A.0.1 - A1 - Atlas Preamble - Definitions' || sectionName === 'A.0.1 - A2 - Atlas Preamble - General Provisions') {
      console.log(sectionName)
      await addFolder(
        driveServer,
        driveId,
        section.id + "-folder",
        section.properties["Doc No (or Temp Name)"].title[0].plain_text,
        parentFolderId
      );

      await addDocument(
        driveServer,
        driveId,
        section.id + "-document",
        section.properties["Doc No (or Temp Name)"].title[0].plain_text,
        "sky/atlas-foundation",
        section.id + "-folder"
      );

      await populateSection(
        driveServer,
        driveId,
        section.id + "-document",
        section,
        article
      );
    }
    // const sectionNameParts = sectionName.split('.');
    // const hasThreeNumbers = sectionNameParts.length === 4 && sectionNameParts.every((part: string, index: number) => index === 0 || !isNaN(Number(part)));

    // if (!hasThreeNumbers) {
    //   continue;
    // }



    // await addDocument(
    //   driveServer,
    //   driveId,
    //   section.id + "-document",
    //   section.properties["Doc No (or Temp Name)"].title[0].plain_text,
    //   "sky/atlas-foundation",
    //   section.id + "-folder"
    // );

    // await populateSection(
    //   driveServer,
    //   driveId,
    //   section.id + "-document",
    //   section,
    //   article
    // );
  }
};

