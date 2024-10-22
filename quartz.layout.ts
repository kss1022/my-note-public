import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const commentConfig = {
    provider: 'giscus',
    options: {      
      repo: 'kss1022/note-comment',      
      repoId: 'R_kgDONBgKmQ',      
      category: 'Comment',      
      categoryId: 'DIC_kwDONBgKmc4CjbpS',
    }
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
     Component.Comments(commentConfig),
  ],
  footer: Component.Footer({
    links: {
      MyGitHub: "https://github.com/kss1022",      
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),        
    Component.MobileOnly(Component.Darkmode()),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.DesktopOnly(Component.Darkmode()),    
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.DesktopOnly(Component.RecentNotes())
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
